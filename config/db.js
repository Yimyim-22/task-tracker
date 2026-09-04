const { DataSource } = require("typeorm")
require("dotenv").config()

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    entities: [
    require("../entities/task"),
    require("../entities/user")
],

synchronize: false

})



module.exports = AppDataSource
