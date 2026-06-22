import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import connectDb from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import workoutRoute from "./routes/workoutRoute.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api/auth", userRoute);
app.use("/api/workouts", workoutRoute);

// Error middleware MUST be last
app.use(errorHandler);

const startServer = async () => {
    try {
        await connectDb();

        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();