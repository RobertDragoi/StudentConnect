const mongoose = require('mongoose');
const User = require('./user');

const studentSchema = new mongoose.Schema({
  student: {
    birthDate: {
      type: Date,
    },
    education: {
      type: String,
      required: true,
      default: '',
    },
    skills: [String],
  },
});

const Student = User.discriminator('Student', studentSchema);

module.exports = Student;
