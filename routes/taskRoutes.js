const express = require("express")
const router = express.Router()

const {getTasks, getTaskById, createTask, updateTask, deleteTask} = require("../controllers/taskController")
const {taskValidator, validator} = require("../middleware/validator")
const { authorizationToken } = require("../middleware/authorizationToken")

router.get("/", getTasks)
router.get("/:id", getTaskById)
router.post("/", taskValidator, validator, authorizationToken, createTask)
router.put("/:id", taskValidator, validator, authorizationToken, updateTask)
router.delete("/:id", authorizationToken, deleteTask)

module.exports = router