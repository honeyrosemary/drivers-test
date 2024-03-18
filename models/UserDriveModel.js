const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");

const UserDriveModelSchema = new Schema({
  /*
  schema for storing user data including first name, last name, age, license number, car details
  and user signup data such as user name, password and user type.
  */
  firstName: { type: String, required: false },
  lastName: { type: String, required: false },
  age: { type: Number, required: false },
  dob: { type: Date, default: new Date() },
  licenseNumber: { type: String, required: false },
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  userType: { type: String, required: true },
  carDetails: {
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    plateNumber: { type: String },
  },
});

// Password Encryption algorithm
UserDriveModelSchema.plugin(uniqueValidator);
UserDriveModelSchema.pre("save", function (next) {
  const user = this;
  bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash;
    next();
  });
});

const UserDriveModel = mongoose.model("user", UserDriveModelSchema);

module.exports = UserDriveModel;
