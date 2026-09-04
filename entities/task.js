const {EntitySchema} = require("typeorm")
const { JoinColumn } = require("typeorm/browser")

const Task = new EntitySchema({
    name: "Task", //Name of entity
    tableName: "tasks", //Name of table in database
    columns: {
        id: {
            type: "integer",
            primary: true,
            generated: true,
            generationStrategy: "increment"    
        },
        title: {
            type: "varchar",
            length: 100,
            nullable: false
        },
        description: {
            type: "text"
        },
        user_id:{
            type: "integer",
            nullable: false
        }
    },
    relations: {
        user: {
            type: "many-to-one", //Many tasks to one user
            target: "User", //The User entity
            inverseSide: "tasks", //The tasks relation on user.js
            joinColumn: {
                name: "user_id" //The id of the User entity is the foreign key
            } 
        }
    }
})

module.exports = Task