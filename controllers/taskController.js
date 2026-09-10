const taskService = require("../services/taskService")

const getTasks = async (req, res)=>{
   try {
     const tasks = await taskService.getTasks()
     res.json(tasks)
 }
    catch (error) {
    res.json(error.message)
}
}

const getTaskById = async (req, res)=>{
   try {
     const task = await taskService.getTaskById(req.params.id)

     if (!task) {
        return res.status(404).json({message: "Task not found"})
     }
     res.json(task)
 }
    catch (error) {
res.json(error.message)
}
}

const createTask = async(req, res)=>{
   try {
const task = await taskService.createTask(req.body.title, req.body.description, req.user.id)
      res.json(task)
   } catch (error) {
      res.json(error.message)
   }
}

const updateTask = async(req, res)=>{
   try {
      const task = await taskService.getTaskById(req.params.id)

            if (!task) {
        return res.status(404).json({message: "Task not found"})
     }

      if (task.user_id !== req.user.id) {
         return res.send("Warning: Cannot edit another users task")
      }  
      
      const updatedTask = await taskService.updateTask(req.params.id, req.body.title, req.body.description, req.user.id)
      res.json(updatedTask)
   } catch (error) {
      res.json(error.message)
   }
}

const deleteTask = async(req, res)=>{
   try {
         const task = await taskService.getTaskById(req.params.id)

      if (!task) {
        return res.status(404).json({message: "Task not found"})
     }

      if (task.user_id !== req.user.id) {
         return res.send("Warning: Cannot delete another users task")
      }   

      await taskService.deleteTask(req.params.id)

      res.send("Task succesfully deleted")
   } catch (error) {
      res.json(error.message)
   }
}

module.exports = {getTasks, getTaskById, createTask, updateTask, deleteTask}