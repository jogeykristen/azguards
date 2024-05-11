const express = require("express");
const router = express.Router();
const {
  authenticateJWT,
  isAdmin,
  isUser,
} = require("../middleware/authMiddleware");
const {
  createTodoItem,
  updateTodoItem,
  deleteTodoItem,
  getTodoItemById,
  getAllTodoItems,
  filterTodoItemsByStatus,
  uploadTodoItems,
  downloadTodoList,
} = require("../controllers/todoController");

router.post("/create", authenticateJWT, createTodoItem);
router.put("/update/:id", authenticateJWT, updateTodoItem);
router.delete("/delete/:id", authenticateJWT, deleteTodoItem);
router.get("/showbyid/:id", authenticateJWT, getTodoItemById);
router.get("/showAll", authenticateJWT, getAllTodoItems);
router.get("/filter", authenticateJWT, filterTodoItemsByStatus);
router.post("/upload", authenticateJWT, uploadTodoItems);
router.get("/download", authenticateJWT, isAdmin, downloadTodoList);

module.exports = router;
