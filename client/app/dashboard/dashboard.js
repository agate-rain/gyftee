angular.module('battlescript.dashboard', [])

.controller('DashboardController', function ($scope, $rootScope, $timeout, Dashboard, Users, Battle) {
  // get current auth username
  $scope.username = Users.getAuthUser();

  // this gets passed into the directive.
  // it definitely needs to be refactored depending on what happens
  // up above.
  $scope.userInfo = {username: $scope.username};

  // Set up all dashboard info.
  $scope.challengeLevel = 8;
  $scope.currentStreak = 0;
  $scope.longestStreak = 0;
  $scope.totalWins = 0;
  $scope.leaderboard = [];

  ////////////////////////////////////////////////////////////
  // sets up all the dashboard stuff here
  ////////////////////////////////////////////////////////////

  // this defaults to false, because when the page first loads, there is 
  // no battle request for the logged in user
  $scope.userHasBattleRequest = false;

  // battle request status can be 'none', 'open', or 'init'. it defaults
  // to none, changes to open when a request is first sent, and changes to
  // init if the user accepts/declines the battle request.
  $scope.battleRequestStatus = 'none';

  // this defaults to null, because by default, no opponents have challenged
  // the logged in user
  $scope.battleRequestOpponentName = null;

  // Set up a unique hash for battling.
  $scope.battleRoomHash;

  ////////////////////////////////////////////////////////////
  // set up online users
  ////////////////////////////////////////////////////////////

  $scope.onlineUsers;


  $rootScope.dashboardSocket.on('updateUsers', function(data) {
    //TODO: Online users.

    console.log('NEED TO UPDATE USERS CUZ OF SOME EVENT');
    console.log(data);

    if (data[$scope.username]) {
      delete data[$scope.username];
    }

    $scope.onlineUsers = data;
    $scope.$apply();

  });


  ////////////////////////////////////////////////////////////
  // get user stats for dashboard
  ////////////////////////////////////////////////////////////

  $scope.getStats = function(username) {
    Users.getStats(username)
      .then(function(stats){
        $scope.currentStreak = stats.currentStreak;
        $scope.longestStreak = stats.longestStreak;
        $scope.totalWins = stats.totalWins;
        $scope.points = $scope.totalWins * 10;
      });
  }

  $scope.getStats($scope.username);

  ////////////////////////////////////////////////////////////
  // get user stats for leaderboard
  ////////////////////////////////////////////////////////////

  $scope.getLeaderboard = function(username) {
    // $scope.leaderboard = Users.getLeaderboard();
    Users.getLeaderboard()
      .then(function(leaderboard){ 
        $scope.leaderboard = leaderboard.data;
        console.log($scope.leaderboard);
      });
  }

  $scope.getLeaderboard();

  ////////////////////////////////////////////////////////////
  // handle battle requests
  ////////////////////////////////////////////////////////////

  // Open up socket with specific dashboard server handler
  $scope.requestBattle = function($event, opponentUsername) {
    $event.preventDefault();
    if (!$scope.challengeLevel) $scope.challengeLevel = 4;
    console.log("CHALLENGE LEVEL: ", $scope.challengeLevel);

    // now, we need to emit to the socket
    $rootScope.dashboardSocket.emit('outgoingBattleRequest', {
      fromUser: $scope.username,  // request from the logged in user
      toUser: opponentUsername,    // request to the potential opponent
      challengeLevel: $scope.challengeLevel
    });
  };

  // listen for incoming battle request
  $rootScope.dashboardSocket.on('incomingBattleRequest', function(userData){
    $scope.battleRequestOpponentName = userData.fromUser;
    $scope.battleRequestChallengeLevel = userData.challengeLevel;
    $scope.userHasBattleRequest = true;
    $scope.battleRequestStatus = 'open';
    $scope.$apply();
    console.log("opponent has challenged you: ", userData.fromUser);
  });

  // battle has been accepted
  $scope.battleAccepted = function() {
    console.log("CHALLENGE ACCEPTED, CHALLENGE LEVEL: ", $scope.battleRequestChallengeLevel);
    // need to somehow notify challenger that the battle has been accepted
    $rootScope.dashboardSocket.emit('battleAccepted', {
      user: $scope.username,                      // the user who accepted the battle
      opponent: $scope.battleRequestOpponentName,  // the opponent needs to be notified
      challengeLevel: $scope.battleRequestChallengeLevel
    });
  };

  // battle has been declined
  $scope.battleDeclined = function() {
    // Reset everything :)
    $scope.userHasBattleRequest = false;
    $scope.battleRequestStatus = 'none';
  };

  // prepare for battle, only gets fired when a user has sent a battle request,
  // and another user has accepted.
  $rootScope.dashboardSocket.on('prepareForBattle', function(data) {
    // at this point, the opponent (i.e. the person who sent the initial battle
    // request) should be notified that the person he/she challenged has
    // accepted.
    console.log('prepare for battle!', data);

    $scope.battleRoomHash = data.roomhash;

    // a notification should pop up on both screens
    $scope.userHasBattleRequest = true;
    $scope.battleRequestStatus = 'init';
    $scope.$apply();
    
    // the url hash needs to also be sent to the player who accepted the
    // challenge
  });
  
});