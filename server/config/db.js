import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Mongodb connected successfully!")
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default connectDb