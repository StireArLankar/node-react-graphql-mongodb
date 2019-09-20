const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = {
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
