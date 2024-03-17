const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  const user = await UserDriveModel.findById(req.session.userId);
  global.responseObject = { status: "", message: "", licenseData: null };
  if (user) {
    global.responseObject = { ...global.responseObject, licenseData: user };
  }
  res.render("G", { responseObjectG: global.responseObject });
};
