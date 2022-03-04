const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const tableDataRoutes = require("./routes/tableDataRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companiesRoutes");

const app = express();

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/userRoutes", userRoutes);
app.use("/companiesRoutes", companyRoutes);
app.use("/", tableDataRoutes);

const routes = require("./routes/userRoutes");

app.use("/routes", routes);

app.listen(port, () => console.log(`Server running on port ${port}`));
