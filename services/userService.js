const AppDataSource = require("../config/db")
const userRepository = AppDataSource.getRepository("User")
const bcrypt = require("bcrypt")

const getUsers = async()=>{
    return await userRepository.find()
}

const getUserById =async(id)=>{
    return await userRepository.findOne({
        where: {id: id},
        relations: {tasks: true}
    })
}

const registerUser = async(name, email, password)=>{
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await userRepository.create({
        name: name,
        email: email,
        password: hashedPassword
    })
    return await userRepository.save(user)
}

const loginUser = async(name, email, password)=>{
    return await userRepository
    .createQueryBuilder("user")
    .addSelect("user.password")
    .where("user.name = :name", {name: name})
    .andWhere("user.email = :email", {email: email})
    .getOne()
}

const updateUser = async (id, name, email, password)=>{

        const user = await userRepository.findOne({
        where: {id: id}
    })

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        user.name = name,
        user.email = email,
        user.password = hashedPassword

        return await userRepository.save(user)
}

const deleteUser = async (id)=>{
    const user = await userRepository.findOne({
    where: {id: id}
})
    return await userRepository.remove(user)
}

module.exports = {getUsers, getUserById, registerUser, loginUser, updateUser, deleteUser}