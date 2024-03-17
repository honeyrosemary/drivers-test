module.exports = (req, res) => {
  global.userData = null;
  req.session.destroy(() => {
    res.redirect("/");
  });
};
