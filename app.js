const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const Event = require('./models/event')
const User = require('./models/user')

const app = express()

app.use(express.json())
app.use('/graphql', graphqlHTTP({
  schema: buildSchema(`
    type Event {
      _id: ID!
      title: String!
      description: String!
      price: Float!
      date: String!
    }

    type User {
      _id: ID!
      email: String!
      password: String
    }

    input EventInput {
      title: String!
      description: String!
      price: Float!
    }

    input UserInput {
      email: String!
      password: String!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
      createUser(userInput: UserInput): User
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    events: () => {
      return Event.find()
        .then((events) => events.map(event => ({...event._doc})))
    },
    createEvent: async (args) => {
      const event = await new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: Number(args.eventInput.price),
        date: Date.now(),
        createdBy: '5d84eb6f96dda32e70aae12a'
      }).save()
      const user = await User.findById(event.createdBy)
      await user.createdEvents.push(event)
      await user.save()
      const result = {...event._doc}
      return result
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
  },
  graphiql: true
}))

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 4000

mongoose
  .connect(process.env.MDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.log(`DB Connection Error: ${err.message}`))

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})
