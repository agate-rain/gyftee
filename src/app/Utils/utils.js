module.exports = {
  formatDate: function(bday) {
    return bday === "Unknown" ? "Unknown" : bday.slice(0,5);
  },

  getUserData: function(category, friend) {
    console.log("GET USER DATA FROM UTILS");
    console.log("FRIEND", friend);
    switch(category){
      case 'books': return friend.books.data;
      case 'music': return friend.music.data;
      case 'location': return friend.location.name;
      case 'birthday': return friend.birthday;
      default: return friend.books;
    }
  },
};
