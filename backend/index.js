const express = require("express");
const dotenv = require("dotenv");
const { dbConnect } = require("./config/db");
dotenv.config({path: "./config/.env"});
const app = express();

const PORT = process.env.PORT;

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


