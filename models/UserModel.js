const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: { required: true, type: String, unique: true },
  password: { required: true, type: String },
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
