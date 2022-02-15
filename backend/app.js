const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const TableDataRoutes = require("./routes/TableDataRoutes");
const User = require("./models/Users");
const Organization = require("./models/Organizations");

const app = express();
app.use("/", TableDataRoutes);

connectDB();


const tsedev = new User({
    fullName: 'tse dev',
    email: 'dev@tse.com',
    companyID: 'tse',
    password: 'password'
});

tsedev.save(function(err){
    if (err) throw err
})

User.findOne({fullName: 'tse dev'}, function (err, user){
    if (err) throw err;
    console.log(user); //password field should be hashed
    user.verifyPassword("password") //should return true
});

const tse = new Organization({
    Name: 'tse',
    Email: 'tse@tse.com',
    Password: 'password',
    ApprovedUsers: [tsedev],
    Status: "coding!"
});

tse.save(function(err){
    if (err) throw err
})

Organization.findOne({Name: 'tse'}, function (err, organization){
    if (err) throw err;
    console.log(organization); //password field should be hashed
    organization.verifyPassword("password") //should return true
});


app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 8082;

const routes = require("./routes/userRoutes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/routes", routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
