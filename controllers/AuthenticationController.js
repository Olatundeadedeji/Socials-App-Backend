import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";

//Register a user
export const userRegister = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;

  //Setup bcrypt salt
  const saltKey = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, saltKey);

  const newUser = new UserModel({
    username,
    email,
    password: hashedPassword,
    firstname,
    lastname,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//User login

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email: email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      isValid
        ? res.status(200).json(user)
        : res.status(400).json("Password is wrong");
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
