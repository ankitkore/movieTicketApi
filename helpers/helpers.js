
module.exports = {
  addHours: (numOfHours, date = new Date()) => {
    date.setHours(date.getHours() + numOfHours);
  
    return date;
  }
}