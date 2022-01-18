const express = require("express");
const connectDB = require("./config/db");
const Group = require("./models/Groups")
const app = express();

connectDB();



const test = new Group({
    Name: 'test1',
    Values: [{name: 'testName', type: 'testtype'}]
});

test.save(function(err){
    if (err) throw err
})

Group.findOne({Name: 'test1'}, function (err, group){
    if (err) throw err;
    console.log(group); 
});




app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));