module.exports = {
  formatDate: function(bday) {
    return bday === "Unknown" ? "Unknown" : bday.slice(0,5);
  }
};
