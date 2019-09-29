const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports = {
  login: async (args) => {
    const { email, password } = args
    const user = await User.findOne({ email: email })

    if (!user) throw new Error('User does not exist')

    const isEqual = await bcrypt.compare(password, user.password)
    if (!isEqual) {
      throw new Error('Password is incorrect')
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.TOKEN_SECRET,
      { expiresIn: '1h' }
    )
    return { _id: user.id, token, tokenExpiration: 1 }
  }
}
