module.exports = (req, res) => {
  let validations = req.flash ? req.flash("validationErrors") : [];
  let showLogin = !validations.length ? true : false;
  let showSignup = validations && validations.length ? true : false;

  res.render("login", {
    errors: validations, // for validation errors
    showLogin, // Set to true to initially show the login section
    showSignup, // Set to false to initially hide the signup section
  });
};
