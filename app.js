const express = require('express')
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

const events = [];

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
      return events
    },
    createEvent: (args) => {
      const event = {
        _id: Math.random().toString(),
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: Number(args.eventInput.description),
        date: new Date().toISOString()
      }
      events.push(event)
      return event
    }
  },
  graphiql: true
}))

app.get('/', (req, res) => {
  res.send('Hello World')
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} port`)
})
