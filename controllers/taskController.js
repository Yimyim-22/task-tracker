const AppDataSource = require("../config/db")
const Task = require("../entities/task")

const getTasks = async (req, res)=>{
   try {
     const taskRepository = AppDataSource.getRepository("Task")

     const tasks = await taskRepository.find({
        relations: {
            user: true
        }
     })

     res.json(tasks)

 }
    catch (error) {
    console.error("GET TASKS ERROR:", error)
    res.status(500).json({
    message: "Server error"
})
}
}

const getTaskById = async (req, res)=>{
   try {
     const taskRepository = AppDataSource.getRepository("Task")

     const task = await taskRepository.findOne({
        where: {id: req.params.id},
        relations: {
            user: true
        }
     })

     if (!task) {
        return res.status(404).json({message: "Task not found"})
     }

     res.json(task)

 }
    catch (error) {
    console.error("GET TASK ERROR:", error)
    res.status(500).json({
    message: "Server error"
})
}
}

const createTask = async(req, res)=>{
   try {
      const taskRepository = AppDataSource.getRepository("Task")
      const task = await taskRepository.create({
         title: req.body.title,
         description: req.body.description,
         user_id: req.user.id
         
      })
      await taskRepository.save(task)
      res.json(task)
   } catch (error) {
      res.json(error.message)
   }
}

const updateTask = async(req, res)=>{
   try {
      const taskRepository = AppDataSource.getRepository("Task")
      const task = await taskRepository.findOne({
         where: {id: req.params.id}
            })

            if (!task) {
        return res.status(404).json({message: "Task not found"})
     }

      if (task.user_id !== req.user.id) {
         return res.send("Warning: Cannot edit another users task")
      }      

      task.title = req.body.title,
      task.description = req.body.description,
      task.user_id = req.user.id

      await taskRepository.save(task)
      res.json(task)
   } catch (error) {
      res.json(error.message)
   }
}

const deleteTask = async(req, res)=>{
   try {
      const taskRepository = AppDataSource.getRepository("Task")
   
      const task = await taskRepository.findOne({
         where: {id: req.params.id}
      })

      if (!task) {
        return res.status(404).json({message: "Task not found"})
     }

      if (task.user_id !== req.user.id) {
         return res.send("Warning: Cannot delete another users task")
      }   

      await taskRepository.remove(task)
      res.send("Task succesfully deleted")
   } catch (error) {
      res.json(error.message)
   }
}

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask}