const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const TableDataRoutes = require("./routes/TableDataRoutes");
const userRoutes = require("./routes/userRoutes");
const companyRoutes = require("./routes/companiesRoutes");

const app = express();
app.use("/", TableDataRoutes);

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

const port = process.env.PORT || 8082;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/userRoutes", userRoutes);
app.use("/companiesRoutes", companyRoutes);
app.use("/TableDataRoutes", TableDataRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
