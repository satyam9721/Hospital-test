import express from "express";
import { config } from "dotenv";
import cors from "cors"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRouter.js"
import appointmentRouter from "./router/appointmentRouter.js"
// import cors from "cors"; 

const app = express();

config({ path: "./config/config.env"});

//connecting fronted to backend using cors
//origin is use to ensure the to merge connection between different ports
app.use(
    cors({
origin :[process.env.FRONTED_URL,process.env.DASHBOARD_URL], 
methods: ["GET","POST","PUT","DELETE"],
credentials:true,

    })
);

//arranging the data in well format,these are middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true  }));

app.use(fileUpload({
useTempFiles: true,
tempFileDir: "/tmp/",

})
);

//below routes are setup
app.use("/api/v1/message",messageRouter);
app.use("/api/v1/user",userRouter);
app.use("/api/v1/appointment", appointmentRouter);


dbConnection();

//always use error middleware in the last
app.use(errorMiddleware)
export default app;