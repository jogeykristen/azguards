const express = require("express");
const router = express.Router();
const authenticateJWT = require("../middleware/authMiddleware");
const {
  registerUser,
  verifyUser,
  loginUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/verify", verifyUser);
router.post("/login", loginUser);
//router.put("/update", authenticateJWT, updateUser);

module.exports = router;
