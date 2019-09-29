const booking = require('./booking')
const events = require('./events')
const users = require('./users')
const auth = require('./auth')

module.exports = {
  ...booking,
  ...events,
  ...users,
  ...auth
}
