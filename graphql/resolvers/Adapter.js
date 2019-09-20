const Event = require('../../models/event')
const User = require('../../models/user')
// const Booking = require('../../models/booking')

const eventAdapter = (event) => ({
  ...event._doc,
  date: new Date(event._doc.date).toISOString(),
  createdBy: userBinder.bind(this, event._doc.createdBy)
})

const userAdapter = (user) => ({
  ...user._doc,
  createdEvents: eventsBinder.bind(this, user._doc.createdEvents)
})

const bookingAdapter = (booking) => ({
  ...booking._doc,
  user: userBinder.bind(this, booking._doc.user),
  event: eventBinder.bind(this, booking._doc.event),
  createdAt: new Date(booking._doc.createdAt).toISOString(),
  updatedAt: new Date(booking._doc.updatedAt).toISOString()
})

const userBinder = userId => {
  return User.findById(userId)
    .then(user => userAdapter(user))
    .catch(err => { throw err })
}

const eventBinder = eventId => {
  return Event.findById(eventId)
    .then(event => eventAdapter(event))
    .catch(err => { throw err })
}

const eventsBinder = eventIds => {
  return Event.find({_id: {$in: eventIds}})
    .then(evs => evs.map(eventAdapter))
    .catch(err => { throw err })
}

module.exports = {
  event: eventAdapter,
  user: userAdapter,
  booking: bookingAdapter
}
