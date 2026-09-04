const express = require("express")
const app = express()

const AppDataSource = require("./config/db")
const taskRoutes = require("./routes/taskRoutes")
const userRoutes = require("./routes/userRoutes")

app.use(express.json())

app.use("/api/tasks", taskRoutes)
app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 5000

AppDataSource.initialize()
    .then(() => {
        console.log("PostgreSQL connected through TypeORM")

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
        })
    })
    .catch((error) => {
        console.error("Database connection failed:", error)
    })