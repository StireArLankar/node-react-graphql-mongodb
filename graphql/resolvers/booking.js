const Adapter = require('./Adapter')

const Event = require('../../models/event')
const Booking = require('../../models/booking')

module.exports = {
  bookings: () => {
    return Booking.find()
      .then((bookings) => bookings.map(Adapter.booking))
  },
  bookEvent: async (args) => {
    const event = await Event.findById(args.eventID)
    const booking = new Booking({
      user: '5d84eb6f96dda32e70aae12a',
      event: event
    })
    const result = await booking.save()
    return Adapter.booking(result)
  },
  cancelBooking: async (args) => {
    const booking = await Booking.findById(args.bookingID).populate('event')
    const event = Adapter.event(booking.event)
    await Booking.deleteOne({_id: args.bookingID})
    return event
  }
}
