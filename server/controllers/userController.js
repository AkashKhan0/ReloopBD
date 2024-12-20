// route for user login
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY);
};

// route for user login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exists" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for user registration
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checking user already registered
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already registered" });
    }

    // validating email address and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }
    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating new user object
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    // saving user to database
    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token });

    //
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// route for admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET_KEY);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid admin credentials" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    // Fetch only the name and email of the user
    const user = await userModel.findById(req.body.userId).select("name email");

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({ success: true, user }); // Return user with name and email only
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { userLogin, userRegister, adminLogin, getUserProfile };
