const Adapter = require('./Adapter')

const Event = require('../../models/event')
const User = require('../../models/user')

module.exports = {
  events: () => {
    return Event.find().then((events) => events.map(Adapter.event))
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated')
    }
    const event = await new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: Number(args.eventInput.price),
      date: Date.now(),
      createdBy: req.userId
    }).save()

    const createdEvent = Adapter.event(event)

    const user = await User.findById(event.createdBy)
    await user.createdEvents.push(createdEvent)
    await user.save()
    return createdEvent
  }
}
