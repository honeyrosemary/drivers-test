const DriveModel = require("../../models/DriveModel");
const { setSuccess, setError } = require("../metaData");

module.exports = async (req, res) => {
    try {
        const { firstName, lastName, age, licenseNumber, make, model, year, plateNumber, dob } = req.body;
        // Create a new user instance using DriveModel
        const newUser = new DriveModel({
            firstName,
            lastName,
            age: parseInt(age), // Convert age to number format
            licenseNumber,
            dob,
            carDetails: {
                make,
                model,
                year: parseInt(year), // Convert year to number format
                plateNumber
            }
        });
        // Save the new user to the database
        await newUser.save();
        setSuccess("Your data has been saved successfully!");
        res.redirect('/g-two');
    } catch (error) {
        // Error while saving to the database
        setError("Please enter all the mandatory fields before proceeding.");
        res.redirect('/g-two');
    }
};