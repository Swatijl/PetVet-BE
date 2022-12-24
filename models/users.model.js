const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  role: { type: String, enum: ["user", "doctor"] },
  name: String,
  dob: Date,
  gender: { type: String, enum: ["male", "female"] },
  contact_no: Number,
  email: String,
  clinic_name: String,
  clinic_address: String,
  years_of_experience: Number,
  clinic_contact_no: Number,
  clinic_email: String,
  license: {
    data: Buffer,
    contentType: String,
  },
  consultation_fee: Number,
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  specialization: {
    type: String,
    enum: ["dog", "cat", "bird", "cattle", "all"],
  },
  services: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  about: String
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
