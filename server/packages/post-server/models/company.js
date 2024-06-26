const mongoose = require('mongoose');
const User = require('./user');

const companySchema = new mongoose.Schema({
  company: {
    creationDate: {
      type: Date,
    },
    activityDomain: {
      type: String,
      required: true,
      default: '',
    },
  },
});

const Company = User.discriminator('Company', companySchema);

module.exports = Company;
