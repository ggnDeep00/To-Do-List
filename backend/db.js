const mongoose = require('mongoose');

const mongoURI = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@cluster0.2hcl3yq.mongodb.net/tod?retryWrites=true&w=majority`;

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;