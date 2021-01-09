const express = require("express");
const todoController = require("../controllers/todo");
const router = express.Router();

router.post("/", todoController.createTodo);

router.put("/state/:id", todoController.updateTodoState);
router.put("/rank/:id", todoController.updateTodosRank);

router.get("/", todoController.getTodos);
module.exports = router;
