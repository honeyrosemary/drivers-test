const UserDriveModel = require("../models/UserDriveModel");

module.exports = async (req, res) => {
  const user = await UserDriveModel.findById(req.session.userId);
  if (user) {
    res.render("G", {
      responseObjectG: { ...global.responseObject, licenseData: user },
    });
  } else {
    res.render("G", { responseObjectG: global.responseObject });
  }
  global.responseObject = { status: "", message: "", licenseData: null };
};
