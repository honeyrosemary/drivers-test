const User = require("../models/UserDriveModel");

module.exports = async (req, res, next) => {
  //get user from db.
  //session
  if (req.session.userId) {
    const user = await User.findById(req.session.userId);
    if (!user || (req.session.userType !== "Driver")) {
      return res.redirect("/");
    }
  }
  next();
  //auth user
};
