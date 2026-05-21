const express = require("express");
const dotenv = require("dotenv");
const { dbConnect } = require("./config/db");
dotenv.config({path: "./config/.env"});
const app = express();
const morgan = require("morgan");
const cors = require("cors")

const PORT = process.env.PORT;

//Middlewares
app.use(morgan("dev"))
app.use(express.json())
app.use(cors());

//Routes
const contactRoutes = require("./routes/contact");
const eventRoutes = require("./routes/event");
const galleryRouter = require("./routes/gallery");
const noticeRouter = require("./routes/notice");
const teacherRouter = require("./routes/teacher");
const userRoute = require("./routes/auth");

//Using Routes
app.use("/api/contact", contactRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/gallery", galleryRouter);
app.use("/api/notice", noticeRouter);
app.use("/api/teacher", teacherRouter);
app.use("/api/user", userRoute);


dbConnect()
    .then(() => {
        console.log("Database connection established succcessfully..!!");
        app.listen(PORT, () => {
            console.log("Server listening at port "+ PORT);
        })
    })
    .catch((err) => {
        console.error("Database cannot be established..!!");
        console.error(err)
    })


