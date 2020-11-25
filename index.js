const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 2000;
const app = express();
const path = require('path');
const expressHandleBars = require('express-handlebars');
const bodyParser = require('body-parser');
const userRoute = require('./user');
app.use(express.json);
app.use("/user", userRoute);
app.use(bodyParser.urlencoded({
    extended: true
}));

//const userRoute = require('./user.js');
// mongoose.connect('mongodb+srv://BlogUser:BlogUser@cluster0.1jp86.mongodb.net/appDB?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// }).catch(err=> {console.log(err);});
const connection = mongoose.connection;
connection.once('open', () => {console.log('MongoDB connected');});
//middleWare
//data = {msg:"Hello World"};
app.route("/").get((req, res) => {
    if(err){
        console.log(err);
    }
    else
        return res.json(data);
    });
app.listen(port,() => console.log(`Your server is running on port ${port}`));
//app.use(express.json());
//app.use('/user',userRoute);
//app.route('/').get((req,res) => res.json('Your 1st rest API'));
