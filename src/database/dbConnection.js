import mongoose from "mongoose";


export const dbConnection = async () => {
    try {
        const mongoDB = await mongoose.connect(
            process.env.DB_URL_CONNECTION,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
        console.log(`Se ha conectado satisfactoriamente a la base de datos de ${mongoDB.connections[0].name}`)
    } catch (error) {
        console.error('Error al conectar a la base de datos');
        throw new Error(error)
    }
}