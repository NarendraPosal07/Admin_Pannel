const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  skils: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  profileImg: {
    type: String,
  }
  
});

const profileModel = mongoose.model("profiles", profileSchema);

module.exports = profileModel;
