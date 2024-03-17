const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  const user = await UserDriveModel.findById(req.session.userId);
  let userData = global.userData || user;
  global.responseObject = {
    status: "",
    message: "",
    licenseData: null,
  };
  if (userData) {
    res.render("dashboard", {
      isLoggedIn: true,
      userInfo: userData,
    });
  } else {
    res.render("dashboard", {
      isLoggedIn: false,
      userInfo: null,
    });
  }
};
