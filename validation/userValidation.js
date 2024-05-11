const { body } = require("express-validator");

const emailValidationRule = body("email")
  .isEmail()
  .withMessage("Invalid email format");

const phoneNumberValidationRule = body("phoneNumber")
  .isNumeric()
  .withMessage("Phone number must be numeric")
  .isLength({ min: 10, max: 10 })
  .withMessage("Phone number must be 10 digits");

module.exports = {
  emailValidationRule,
  phoneNumberValidationRule,
};
