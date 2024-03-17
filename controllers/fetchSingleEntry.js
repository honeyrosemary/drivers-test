const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  try {
    const { licenseNumber } = req.body;
    // Search for the data in the database based on the license number
    if (!licenseNumber) {
      global.setError("Please enter your license number!");
      res.redirect("/gtest");
    } else {
      const foundData = await UserDriveModel.findOne({ licenseNumber });
      if (foundData) {
        global.setSuccess("Your data has been fetched successfully!");
        global.responseObject = {
          ...global.responseObject,
          licenseData: foundData,
        };
        res.redirect("/gtest");
      } else {
        // If license info is not found, render an error message or redirect to an error page
        global.setError("No data found based on the license number provided!");
        res.redirect("/gtest");
      }
    }
  } catch (error) {
    global.setError("Something went wrong. Please try again!");
    res.redirect("/gtest");
  }
};
