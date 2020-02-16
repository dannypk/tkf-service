const User = require('../../models/user.model');

class UserService {
  findUserByEmail(email) {
    return User.findOne({ email: email }).lean();
  }

  createUser(user) {
    return new User(user).save();
  }

  async registerUser(name, email, password) {
    const user = await this.findUserByEmail(email);
    if (user) {
      throw new Error('User with this email address is already registered.');
    }

    return this.createUser({ name, email, password });
  }

  async login(email, password) {
    const user = await this.findUserByEmail(email);

    if (user && user.password === password) {
      return user;
    }

    return undefined;
  }
}

module.exports = new UserService();