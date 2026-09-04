const express = require("express")
const router = express.Router()

const {getUsers, getUserbyId, registerUser, loginUser, updateUser, deleteUser} = require("../controllers/userController")
const {userValidator, validator} = require("../middleware/validator")
const {authorizationToken} = require("../middleware/authorizationToken")

router.get("/", getUsers)
router.get("/:id", getUserbyId)
router.post("/register", userValidator, validator, registerUser)
router.post("/login", userValidator, validator, loginUser)
router.put("/:id", userValidator, validator, authorizationToken, updateUser)
router.delete("/:id", authorizationToken, deleteUser)

module.exports = router