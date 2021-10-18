const express = require("express");


const dotenv = require("dotenv");
//we need to inform the express server to use the variable of the config.env file, 
//so we require dotenv module.
//dotenv module allows to separate our secret information from our source code,
//this is very useful when we work in collaborative environment, i.e when we want,
//to share our code with other people 
//so instead of sharing our credential we can share the source code while allowing,
//other people to create their own dotenv file.


const morgan = require("morgan"); 
//morgan module allows us to log a request on the console whenever we make a request.


const bodyparser = require("body-parser"); 


const path = require("path");


const connectionDB = require('./server/database/connection');
const connectDB = require("./server/database/connection");

const app = express();


dotenv.config({path: 'config.env'})//we need to specify the path of the config.env file,
//so we can use the PORT variable
const PORT = process.env.PORT || 8080 //stores all details in dotenv file and 
//if the variable of this dotenv file is not available,
//we just pass the default value 8080.


//log requests
app.use(morgan('tiny')); 
//morgan('tiny') tiny is a token 


//mongodb connection
connectDB();


//parse request to body-parser
app.use(bodyparser.urlencoded({extended : true})) //this will parse the request of the 
//contenttype from urlencoded



//set view engine
app.set("view engine", "ejs")
/* app.set("views",path.resolve(__dirname, "views/ejs")) */


//load assets
app.use('/css',express.static(path.resolve(__dirname, "assets/css")))
app.use('/img',express.static(path.resolve(__dirname, "assets/css")))
app.use('/js',express.static(path.resolve(__dirname, "assets/js")))


//load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
//const PORT = process.env.PORT || 8080 
//if we do this then our server starts on 8080 
//because as we know that right now(i.e before creating the .env file) 
//we dont have the PORT variable inside dotenv file,
//for this we need to create dotenv file and create the PORT variable inside it 
//and specify value to it.
//const PORT = process.env.PORT || 8080 
//right now it's going to specify the default value to the PORT variable which is 8080
//after we create .env file we will/can assign 3000/any port number to PORT variable
})