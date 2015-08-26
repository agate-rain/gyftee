// keep a global obj for all rooms
var rooms = {
  storage: {},
  roomCount: 0
};

var Room = function(roomhash) {
  var roomInstance = {};
  
  roomInstance.users =[];
  roomInstance.members = 0;
  roomInstance.maxOccupancy = 2;
  roomInstance.id = roomhash;


  roomInstance.needsMember = function() {
    return this.members < this.maxOccupancy;
  }

  return roomInstance;
};

// creates a new room
var createRoom = function(roomhash){
  var newRoom = Room(roomhash);
  updateRooms(newRoom);
  rooms.roomCount += 1;
  return newRoom;
};


var updateRooms = function(room){
  rooms.storage[room.id] = room;
};

var getOpenRoom = function(){
  console.log("STORAGE: ", rooms.storage);
  for (var id in rooms.storage) {
    if (rooms.storage[id].needsMember()){
      console.log("FOUND A 1-PERSON ROOM");
      return rooms.storage[id];
    }
  }
  console.log("DIDNT FIND A SUITABLE ROOM");
  return null;
};

var removeRoom = function(id){
  console.log("DELETING ROOM");
  delete rooms.storage[id];
};

var checkForRoomWithHash = function(roomhash){
  // if (rooms.storage.[roomhash]) 
};

// check if room with roomhash id has already been created
// if yes, send back that room
// if no, create that room, with roomhash id, and send it back
var createOrGetRoom = function(roomhash){
  var room = rooms.storage[roomhash] || createRoom(roomhash);

  if (room.needsMember()) {
    room.members++;
    return room;
  }

  return null;
};



module.exports.createOrGetRoom = createOrGetRoom;
module.exports.updateRooms = updateRooms;
module.exports.removeRoom = removeRoom;
module.exports.rooms = rooms;