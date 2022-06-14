import UserModel from "@models/UserModel";

export const userRegister = async (req, res) => {
  const { username, email, password, firstname, lastname } = req.body;
  const newUser = new UserModel({
    username,
    email,
    password,
    firstname,
    lastname,
  });
};

try {
  await newUser.save();
  res.status(201).json(newUser);
} catch (error) {
  res.status(500).json({ message: error.message });
}
