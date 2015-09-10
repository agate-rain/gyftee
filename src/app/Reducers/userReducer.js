import { ADD_FRIEND, REMOVE_FRIEND, FETCH_FRIENDS, GET_USER } from '../Constants/ActionTypes';

const initialState = { profile: {}, friends: [] };

export default function userReducer(state=initialState, action) {
  // DO NOT mutate the state, return a NEW state

  switch (action.type) {
    case ADD_FRIEND:
      return Object.assign({}, state, {
        friends: state.friends.concat([action.friend])
      });

    case REMOVE_FRIEND:
      var friends = state.friends.filter(friend => {
        return friend.id !== action.id;
      });
      return Object.assign({}, state, { friends: friends });

    case FETCH_FRIENDS:
      var getDaysFromToday = function(birthday) {
        if(!birthday) {
          return null;
        }
        var today = new Date();
        var currentYear = today.getFullYear();
        var friendBdayArray = birthday.split('/');
        var friendBdayMonth = friendBdayArray[0];
        var friendBdayDD = friendBdayArray[1];
        // replace year with current year 
        var friendBday = new Date(currentYear, friendBdayMonth, friendBdayDD);
        // calculate days from now to the bday; getTime() returns time in ms 
        var elapsed = friendBday.getTime() - today.getTime();
        // 86,400,000 ms per day
        var daysFromToday = Math.floor(elapsed / 86400000); 
        // add 365 days to get upcoming day 
        if(daysFromToday < 0) {
          daysFromToday = daysFromToday + 365;
        }
        return daysFromToday;    
      };

      var friends = [];
      action.friends.forEach(function(friend) {
        friend.daysFromToday = getDaysFromToday(friend.birthday);
        friends.push(friend);
      });

      friends.sort(function(a, b){
        if (a.daysFromToday === null) {
          return 1;
        }
        if (b.daysFromToday === null) {
          return -1;
        }
        return a.daysFromToday - b.daysFromToday;
      });

      return Object.assign({}, state, { friends: friends });

    case GET_USER:
      return Object.assign({}, state, { profile: action.profile });

    default:
      return state;

  }

};
