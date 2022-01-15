const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/Users");

const app = express();

connectDB();


const pratyush = new User({
    fullName: 'pratyush chand',
    email: 'haha',
    companyID: '123',
    password: 'hiya'
});

pratyush.save(function(err){
    if (err) throw err
})

User.findOne({fullName: 'pratyush chand'}, function (err, user){
    if (err) throw err;
    console.log(user); //password field should be hashed
    user.verifyPassword('hiya') //should return true
});



app.get("/", (req, res) => res.send("hello!"));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
