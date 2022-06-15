const User = require("../model/userModel");
const bcrypt = require("bcrypt");

// Register
module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const emailCheck = await User.findOne({ email });

    // check if email is already in use
    if (emailCheck)
      return res.json({ msg: "Email is already in use.", status: false });

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    // delete original password
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

// Login
module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // if email not found
    if (!user)
      return res.json({ msg: "Incorrect Email or Password.", status: false });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    // if password is invalid
    if (!isPasswordValid)
      return res.json({ msg: "Incorrect Email or Password.", status: false });

    // delete original password
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

// Set Avatar
module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;

    // find user and update image
    const userData = await User.findByIdAndUpdate(userId, {
      isAvatarImageSet: true,
      avatarImage,
    });

    // status
    return res.json({
      isSet: userData ? true : false,
      image: userData ? avatarImage : "",
    });
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};

// Get All Users
module.exports.getAllUsers = async (req, res, next) => {
  try {
    // fetch all users except current user
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "isAvatarImageSet",
      "_id",
    ]);

    return res.json(users);
  } catch (ex) {
    console.log(ex);
    next(ex);
  }
};
