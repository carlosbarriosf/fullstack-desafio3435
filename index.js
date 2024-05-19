import dotenv from "dotenv"
import express from "express"
import { dbConnection } from "./src/database/dbConnection.js"
import noteRoute from "./src/routes/notes.routes.js"

const server = express()

dotenv.config()

const api = async () => {
    await dbConnection()

    server.use(express.json())

    server.use("/api/notes", noteRoute)

    server.listen(process.env.PORT, () => console.log(`Servidor corriendo en el puerto ${process.env.PORT}`))
}

api();