import mongoose from "mongoose"


export async function connectDB() {
    try {
        let connection;
        console.log("connection?.connection", connection?.connection)
        if (connection?.connection?.readyState !=1) {
            connection = await mongoose.connect(process.env.MONGODB_URI)
            console.log("DB connected ...")
        }
    } catch (err) {
        console.log("error not connect ==>", err)
    }
}