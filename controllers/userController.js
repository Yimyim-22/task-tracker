const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const AppDataSource = require("../config/db")
const User = require("../entities/user")

const getUsers = async (req, res)=>{
    try {
        const userRepository = AppDataSource.getRepository("User")
    
        const users = await userRepository.find()
    
        res.json(users)
    } catch (error) {
    console.error("GET USERS ERROR:", error)
    res.status(500).json({
    message: "Server error"
})
}
}

const getUserbyId = async (req, res)=>{
    try {
        const userRepository = AppDataSource.getRepository("User")
    
        const user = await userRepository.findOne({
            where: {id: req.params.id},
            relations: {
                tasks: true
            }
        })
    
        if (!user) {
        return res.status(404).json({message: "User not found"})
     }

        res.json(user)

    } 
    catch (error) {
    console.error("GET USER ERROR:", error)
    res.status(500).json({
    message: "Server error"
})
}
}

const registerUser = async (req, res)=>{
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        const userRepository = AppDataSource.getRepository("User")
        const user = await userRepository.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        await userRepository.save(user)
        res.json(user)

    } catch (error) {
        res.json(error.message)
    }
}

const loginUser = async (req, res)=>{
    const userRepository = AppDataSource.getRepository("User")
    const user = await userRepository
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.name = :name", {name: req.body.name})
    .andWhere("user.email = :email", {email: req.body.email})
    .getOne()

    if (user == null) {
        return res.send("User does not exist")
    }

    try {
        if (await bcrypt.compare(req.body.password, user.password)){
            const token = jwt.sign(
                {id: user.id},
                process.env.JWT_SECRET,
                {expiresIn: "1h"}
        )
        res.send(token)            
        } else{
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

        const userRepository = AppDataSource.getRepository("User")
        const user = await userRepository.findOne({
        where: {id: req.params.id}
    })

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        user.name = req.body.name,
        user.email = req.body.email,
        user.password = hashedPassword

        await userRepository.save(user)

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

        const userRepository = AppDataSource.getRepository("User")
        const user = await userRepository.findOne({
        where: {id: req.params.id}
    })
        await userRepository.remove(user)

        res.send("User deleted succesfully!")
    } catch (error) {
        return res.send(error.message)
    }}

module.exports = {getUsers, getUserbyId, registerUser, loginUser, updateUser, deleteUser}