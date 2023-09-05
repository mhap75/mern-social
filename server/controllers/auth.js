import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* USER REGISTRATION */
export const register = async (req, res) => {
  const { body } = req;

  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newSavedUser = await User.create({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    res.status(201).json(newSavedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  const { body } = req;

  try {
    const { email, password } = body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res
        .status(400)
        .json({ message: `There are no users with email ${email}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: `Invalid password for ${email}` });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
