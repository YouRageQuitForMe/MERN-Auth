const mongoose = require("mongoose");


const dbConnection = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@${process.env.DB_NAME}.obrp7.mongodb.net/users?retryWrites=true&w=majority`);
        console.log("Connection to db successful!");
    } catch (err) {
        console.log("Connection to db has failed:\n" + err );
    }
}

module.exports = dbConnection;