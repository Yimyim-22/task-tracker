const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const userService = require("../services/userService")

const getUsers = async (req, res)=>{
    try {
        const users = await userService.getUsers()
        res.json(users)
    } catch (error) {
        res.json(error.message)
    }
}

const getUserbyId = async (req, res)=>{
    try {        
    const user = await userService.getUserById(req.params.id)

        if (!user) {
        return res.status(404).json({message: "User not found"})
     }

        res.json(user)

    } 
    catch (error) {
    res.json(error.message)
}
}

const registerUser = async (req, res)=>{
    try {
        const user = await userService.registerUser(req.body.name, req.body.email, req.body.password)
        
        const { password, ...userWithoutPassword } = user
        res.json(userWithoutPassword)

    } catch (error) {
        res.json(error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const user = await userService.loginUser(
            req.body.name,
            req.body.email
        )

        if (user == null) {
            return res.send("User does not exist")
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            const token = jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            )

            res.send(token)
        } else {
            res.send("Wrong password")
        }

    } catch (error) {
        res.json(error.message)
    }
}

const updateUser = async (req, res)=>{
    try {
        if (req.user.id !== Number(req.params.id)) {
            return res.send("Warning: Cannot edit another user!")
        }

        const user = await userService.updateUser(req.params.id, req.body.name, req.body.email, req.body.password)

        const { password, ...userWithoutPassword } = user
        res.json(userWithoutPassword)
    } catch (error) {
        return res.send(error.message)
    }
}

const deleteUser = async (req, res)=>{
    try {
         if (req.user.id !== Number(req.params.id)) {
             return res.send("Warning: Cannot delete another user!")
         }

         await userService.deleteUser(req.params.id)

        res.send("User deleted succesfully!")
    } catch (error) {
        return res.send(error.message)
    }}

module.exports = {getUsers, getUserbyId, registerUser, loginUser, updateUser, deleteUser}