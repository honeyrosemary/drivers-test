const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  const user = await UserDriveModel.findById(req.session.userId);

  if (user) {
    global.responseObject = { ...global.responseObject, licenseData: user };
  }

  res.render("G2", { responseObject: global.responseObject });
  global.responseObject = { status: "", message: "", licenseData: null };
};
