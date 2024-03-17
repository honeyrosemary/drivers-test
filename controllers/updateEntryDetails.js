const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  try {
    // Extract updated user information from the request body
    const {
      firstName,
      lastName,
      age,
      dob,
      licenseNumber,
      make,
      model,
      year,
      plateNumber,
    } = req.body;
    // Simple validations for make, model, year, and platno
    if (!make || !model || !year || !plateNumber) {
      throw new Error("Make, model, year, and plate number cannot be empty.");
    }
    // Additional validation for year
    if (isNaN(year) || year < 1900 || year > new Date().getFullYear()) {
      throw new Error("Invalid year.");
    }
    // Define the update object
    const updatePayload = {
      firstName,
      lastName,
      age,
      dob,
      licenseNumber,
      carDetails: {
        make,
        model,
        year,
        plateNumber,
      },
    };
    // Find the user in the database based on the license number and update its information
    await UserDriveModel.findOneAndUpdate({ licenseNumber }, updatePayload);
    // Redirect to a success page
    global.setSuccess("Your data has been updated successfully!");
    res.redirect("/gtest");
  } catch (error) {
    global.setError("Error : " + error.message);
    res.redirect("/gtest");
  }
};
