const User = required("../model/user.model.js");
exports.createUser = async (req, res) => {
  return await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
};
