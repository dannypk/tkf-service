const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String },
  password: { type: String },
  email: { type: String }
});

module.exports = mongoose.model('UserSchema', UserSchema, 'users');