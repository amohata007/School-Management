const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./config/.env"});
const app = express();

const PORT = process.env.PORT;

app.get("/",(req,res)=>{
    res.send("Hello from the server");
})

app.listen(PORT, ()=>{
    console.log("Server is connected on port "+PORT);
})
