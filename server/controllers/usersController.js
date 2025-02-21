import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { UserDto } from "../dto/user.js";

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const isAlreadyUser = await User.findOne({ username });

    if (isAlreadyUser) {
      return res.json({ message: "user already registered", status: false });
    }
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ message: "email already in use", status: false });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    const userDtoInstance = new UserDto(user);
    return res.json({ status: true, userDtoInstance });
  } catch (error) {
    return next(error);
  }
};

// login controller
const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "incorrect username", status: false });
    }
    const isUserPassword = await bcrypt.compare(password, user.password);
    if (!isUserPassword) {
      return res.json({ message: "invalid password", status: false });
    }
    const userDtoInstance = new UserDto(user);
    console.log("", userDtoInstance);
    return res.json({ status: true, userDtoInstance });
  } catch (error) {
    return next(error);
  }
};

const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json({ users });
  } catch (error) {
    next(error);
  }
};

export { registerUser, loginUser, setAvatar, getAllUsers };
