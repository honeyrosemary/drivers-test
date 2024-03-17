const User = require("../models/UserDriveModel");
const bcrypt = require("bcrypt");

module.exports = async (req, res) => {
  // Get info from UI
  const uName = req.body.userName;
  const pass = req.body.password;

  // Comp with DB
  // fectch user from DB.
  try {
    const user = await User.findOne({ userName: uName });
    if (user) {
      global.userData = user;
      bcrypt.compare(pass, user.password, (error, isSame) => {
        if (isSame) {
          // Session
          req.session.userId = user._id;
          // User Type
          req.session.userType = user.userType;
          // Login Redirection
          console.log("User login Successful!!!");
          res.redirect("/");
        } else {
          console.log("Passwords do not match!!!");
          res.redirect("/login");
        }
      });
    } else {
      global.userData = null;
      console.log("Not a user!!!");
      global.setError("Error: Invalid credentials. Please try again!");
      res.redirect("/login");
    }
  } catch (error) {
    console.log("Error :: While login fun!");
    res.redirect("/login");
  }
  //Login
};
