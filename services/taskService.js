const AppDataSource = require("../config/db")
const taskRepository = AppDataSource.getRepository("Task")

const getTasks = async ()=>{
    return await taskRepository.find({
        relations: {
            user: true
        }
     })
}

const getTaskById = async (id)=>{
    return await taskRepository.findOne({
        where: {id: id},
        relations: {
            user: true
        }
     })
}

const createTask = async(title, description, userId)=>{
      const task = await taskRepository.create({
         title: title,
         description: description,
         user_id: userId
               })
      return await taskRepository.save(task)
}

const updateTask = async(id, title, description, userId)=>{
     const task = await taskRepository.findOne({
         where: {id: id}
            })

      task.title = title,
      task.description = description,
      task.user_id = userId

      return await taskRepository.save(task)
}

const deleteTask = async(id)=>{
      const task = await taskRepository.findOne({
         where: {id: id}
      })

      return await taskRepository.remove(task)
}

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask}