const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
let dbConfig = require("./database/db");
var cors = require("cors");
const userRoute = require('./routes/user')

const app = express();
app.use(bodyParser.json());
app.use(cors({origin : '*'}))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });


app.use('/api/users', userRoute); 

const port = process.env.PORT || 8080;


const server = app.listen(port, () => {
    console.log("Connected to port " + port);
  });
  

mongoose.Promise = global.Promise;
mongoose
.connect(dbConfig.db, {
    useNewUrlParser: true,
})
.then(
    () => {
    console.log("Database sucessfully connected!");
    },
    (error) => {
    console.log("Could not connect to database : " + error);
    }
);
  
  
  