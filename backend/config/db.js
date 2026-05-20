const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config/.env" });
const URL = process.env.MONGO_URI;

const dbConnect = async () => {
    await mongoose.connect(URL)
}

module.exports = {dbConnect};