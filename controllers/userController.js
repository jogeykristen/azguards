const { validationResult } = require("express-validator");
const {
  emailValidationRule,
  phoneNumberValidationRule,
} = require("../validation/userValidation");

const userService = require("../service/userService");

async function registerUser(req, res) {
  await Promise.all([
    emailValidationRule.run(req),
    phoneNumberValidationRule.run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({ errors: errorMessages });
  }

  const userData = req.body;
  try {
    const verificationCode = await userService.registerUser(userData);
    res.status(201).json({
      message: "User created successfully",
      verificationCode: verificationCode.verificationCode,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function verifyUser(req, res) {
  const { email, verificationCode } = req.body;
  try {
    var user = await userService.verifyUser(email, verificationCode);
    res.status(200).json({ message: user.message });
  } catch (error) {
    res.status(400).json({ message: user.message });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const user = await userService.loginUser(email, password);
    if (user == "User not verified") {
      return res.status(200).json({ message: user });
    }
    const token = await userService.generateAuthToken(user);
    console.log("token = ", token);

    res.json({ message: "user logged in", token: token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
}

module.exports = {
  registerUser,
  verifyUser,
  loginUser,
};
