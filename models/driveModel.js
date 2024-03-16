const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DriveModelSchema = new Schema({
    // schema for storing user data including first name, last name, age, license number, and car details.
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, default: new Date() },
    licenseNumber: { type: String, required: true },
    carDetails: {
        make: { type: String },
        model: { type: String },
        year: { type: Number },
        plateNumber: { type: String }
    }
});

const DriveModel = mongoose.model('driveModel', DriveModelSchema);

module.exports = DriveModel;