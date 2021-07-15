const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Por favor insira o seu nome'],
  },
  lastName: {
    type: String,
    required: [true, 'Por favor insira o seu sobrenome'],
  },
  email: {
    type: String,
    required: [true, 'Por favor insira seu email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor insira um email válido',
    ],
  },
  password: {
    type: String,
    select: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', UserSchema);
