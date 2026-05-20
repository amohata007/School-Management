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

//Using Routes
app.use("/api/contact", contactRoutes);

app.get("/",(req,res)=>{
    res.send("Hello from the server");
})

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


