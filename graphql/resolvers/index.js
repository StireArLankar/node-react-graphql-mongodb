const bcrypt = require('bcryptjs')

const Event = require('../../models/event')
const User = require('../../models/user')

const eventAdapter = (event) => ({
  ...event._doc,
  date: new Date(event._doc.date).toISOString(),
  createdBy: userBinder.bind(this, event._doc.createdBy)
})

const userAdapter = (user) => ({
  ...user._doc,
  createdEvents: eventsBinder.bind(this, user._doc.createdEvents)
})

const userBinder = userId => {
  return User.findById(userId)
    .then(user => userAdapter(user))
    .catch(err => { throw err })
}

const eventsBinder = eventIds => {
  return Event.find({_id: {$in: eventIds}})
    .then(evs => evs.map(eventAdapter))
    .catch(err => { throw err })
}

module.exports = {
  events: () => {
    return Event.find()
      .then((events) => events.map(eventAdapter))
  },
  createEvent: async (args) => {
    const event = await new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: Number(args.eventInput.price),
      date: Date.now(),
      createdBy: '5d84eb6f96dda32e70aae12a'
    }).save()

    const createdEvent = eventAdapter(event)

    const user = await User.findById(event.createdBy)
    await user.createdEvents.push(createdEvent)
    await user.save()
    return createdEvent
  },
  createUser: async (args) => {
    const existingUser = await User.findOne({email: args.userInput.email})
    if (existingUser) {
      throw new Error('User exists already')
    }
    const pass = await bcrypt.hash(args.userInput.password, 12)
    const user = new User({
      email: args.userInput.email,
      password: pass
    })
    return user.save()
      .then((result) => ({...result._doc, password: null}))
  }
}
