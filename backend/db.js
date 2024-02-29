const mongoose = require("mongoose");
const mongoURI ="mongodb://localhost:27017/My_Notes";

const connectToMongo = () => {
    mongoose.connect(mongoURI)
        console.log("Connected Mongo Successfully!")
};

module.exports = connectToMongo;