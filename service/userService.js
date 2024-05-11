const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function registerUser(userData) {
  const { name, email, password, phoneNumber, role } = userData;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
      verificationCode,
    });
    return newUser;
  } catch (error) {
    throw new Error("Error creating user: " + error.message);
  }
}

async function verifyUser(email, verificationCode) {
  try {
    const user = await User.findOne({ where: { email, verificationCode } });

    if (user) {
      await User.update(
        { isVerified: true },
        { where: { email, verificationCode } }
      );
      return { message: "User verified successfully" };
    } else {
      return { message: "Invalid email or verification code" };
    }
  } catch (error) {
    throw new Error("Error verifying user: " + error.message);
  }
}

async function loginUser(email, password) {
  try {
    const user = await User.findOne({ where: { email: email } });
    //console.log("user ==== ", user);
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isVerified == "1") {
      console.log("status = ", user.isVerified);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }
      return user;
    }
    return "User not verified";
  } catch (error) {
    throw new Error("Error logging in: " + error.message);
  }
}

async function generateAuthToken(user) {
  const token = jwt.sign({ _id: user._id, role: user.role }, "token");
  return token;
}

async function updateUser(userId, newData) {
  try {
    const updatedUser = await User.updateOne({ _id: userId }, newData, {
      new: true,
    });
    return updatedUser;
  } catch (error) {
    throw new Error("Error updating user: " + error.message);
  }
}

async function deleteUser(userId) {
  try {
    const deletedUser = await User.deleteOne({ _id: userId });
    return deletedUser;
  } catch (error) {
    throw new Error("Error deleting user: " + error.message);
  }
}

async function getAllUsers() {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw new Error("Error fetching user: " + error.message);
  }
}

module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  generateAuthToken,
  updateUser,
  deleteUser,
  getAllUsers,
  getUserById,
};
