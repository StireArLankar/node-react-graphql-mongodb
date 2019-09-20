const booking = require('./booking')
const events = require('./events')
const users = require('./users')

module.exports = {
  ...booking,
  ...events,
  ...users
}
