const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  let user = {};
  if (req.session.userId) {
    user = await UserDriveModel.findById(req.session.userId);
  }
  try {
    if (req.body.password !== req.body.repeatPassword) {
      throw new Error("Password mismatch found. Please retry!");
    }

    const {
      firstName = "",
      lastName = "",
      age = "0",
      licenseNumber = "",
      make = "",
      model = "",
      year = "0",
      plateNumber = "",
      dob,
      userName = user.userName || "",
      userType = "Driver",
      password = user.password || "",
    } = req.body;

    // Create a new user instance using UserDriveModel
    const newUser = new UserDriveModel({
      firstName,
      lastName,
      age: parseInt(age), // Convert age to number format
      licenseNumber,
      dob,
      userName,
      userType,
      password,
      carDetails: {
        make,
        model,
        year: parseInt(year), // Convert year to number format
        plateNumber,
      },
    });

    // Save the new user to the database
    await newUser.save();
    global.setSuccess("Your data has been saved successfully!");
    res.redirect("/login");
  } catch (err) {
    // Error while saving to the database
    let validationErrors = [err.message];
    if (err.errors) {
      validationErrors = Object.keys(err.errors).map(
        (key) => err.errors[key].message
      );
    }
    if (err.message || (validationErrors && validationErrors.length)) {
      req.flash("validationErrors", validationErrors);
      req.flash("data", req.body);
    } else {
      global.setError(
        "Please enter all the mandatory fields before proceeding."
      );
    }
    res.redirect("/login");
  }
};
