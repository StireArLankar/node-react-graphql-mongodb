const Adapter = require('./Adapter')

const Event = require('../../models/event')
const Booking = require('../../models/booking')

module.exports = {
  bookings: (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated')

    return Booking.find({ user: req.userId }).then((bookings) =>
      bookings.map(Adapter.booking)
    )
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated')

    const event = await Event.findById(args.eventID)

    const booking = new Booking({
      user: req.userId,
      event: event
    })

    const result = await booking.save()

    return Adapter.booking(result)
  },
  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new Error('Unauthenticated')

    const booking = await Booking.findById(args.bookingID).populate('event')

    const event = Adapter.event(booking.event)

    await Booking.deleteOne({ _id: args.bookingID })

    return event
  }
}
