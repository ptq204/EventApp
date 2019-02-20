const dateToString = (date) => new Date(date).toISOString().substr(0,10);

module.exports = {
  dateToString: dateToString
}