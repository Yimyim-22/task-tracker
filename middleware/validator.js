const {body, validationResult} = require("express-validator")

const userValidator = [
    body("name").notEmpty().withMessage("User required"),
    body("email").notEmpty().withMessage("Email required"),
    body("password").notEmpty().withMessage("Password required")
]

const taskValidator = [
    body("title").notEmpty().withMessage("title required"),
    body("description").notEmpty().withMessage("description required")
]

const validator = (req, res, next)=>{
    const errors = validationResult(req)
if (!errors.isEmpty()) {
    return res.status(400).json({
    errors: errors.array()
})
}
next()
}

module.exports = {userValidator, taskValidator, validator}    