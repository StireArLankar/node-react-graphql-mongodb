const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const mongoose = require('mongoose')
require('dotenv').config()

const Event = require('./models/event')

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

    input EventInput {
      title: String!
      description: String!
      price: Float!
    }

    type RootQuery {
      events: [Event!]!
    }

    type RootMutation {
      createEvent(eventInput: EventInput): Event
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
    createEvent: (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: Number(args.eventInput.price),
        date: Date.now()
      })
      return event
        .save()
        .then((result) => {
          return {...result._doc}
        })
        .catch((err) => {
          console.log(err)
          throw err
        })
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
