const User = require("../models/UserDriveModel");

module.exports = async (req, res, next) => {
  // session redirection based on user data from db
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (!user || (req.session.userType !== "Driver")) {
      return res.redirect("/");
    }
  }
  //auth user
  next();
};
