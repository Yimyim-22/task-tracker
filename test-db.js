const AppDataSource = require("./config/db")

AppDataSource.initialize()
    .then(() => {
        console.log("PostgreSQL connected through TypeORM")
    })
    .catch((error) => {
        console.error("Database connection failed:", error)
    })