// dependency
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');

app.use(cors());

//enviroment variables
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.URI ;
const collection = process.env.COL;

//message 
console.log('ttl mongo indexing service is running at:' + PORT);

//import Routes
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user'); 
const healthRoute = require("./routes/health");
//body Parser
//app.use(bodyParser.urlencoded({ extended: false }))

//json parser
app.use(express.json());

//Logger For Testing
const logs = require('./middleware/logs');
app.use(logs);

//route MiddleWares
app.use('/api/users',userRoutes);
app.use('/api', healthRoute);

//connection with mongoDb
mongoose.connect(mongoURI)
.then(() => {    
    const db = mongoose.connection.db;
    const myCollection = db.collection(collection);

    // Define the TTL index for the collection
    return myCollection.createIndex({ created: 1 }, { expireAfterSeconds: 60 });
})
.then(() => {
    console.log('connected to mongo!');   
})
.catch(err => {
    console.log("mongo connection error: ", err);
})

//listen on required port 
app.listen(PORT);