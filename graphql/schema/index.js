const { buildSchema } = require('graphql')

module.exports = buildSchema(`
type Event {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  createdBy: User!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdEvents: [Event!]
}

type Booking {
  _id: ID!
  user: User!
  event: Event!
  createdAt: String!
  updatedAt: String!
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
  bookings: [Booking!]!
}

type RootMutation {
  createEvent(eventInput: EventInput): Event
  createUser(userInput: UserInput): User
  bookEvent(eventID: ID!): Booking!
  cancelBooking(bookingID: ID!): Event!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
