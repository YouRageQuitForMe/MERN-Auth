require("dotenv").config();

const express = require("express");
const app = express();

const job = require("./utils/jobs");
job();

const cors = require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))

const db = require("./config/db/dbConnection");
db();

const routes = require("./routes/auth");
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(routes);

const port = process.env.PORT || 5001

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})