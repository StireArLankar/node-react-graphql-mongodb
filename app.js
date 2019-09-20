const express = require('express')
const graphqlHTTP = require('express-graphql')
const mongoose = require('mongoose')
require('dotenv').config()

const schema = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')

const app = express()

app.use(express.json())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
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
