require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const tableDataRoutes = require("./routes/tableDataRoutes");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const groupRoutes = require("./routes/groupRoutes");
const path = require("path");

connectDB();

const port = process.env.PORT || 80;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/", organizationRoutes);
app.use("/", groupRoutes);
app.use("/", tableDataRoutes);
app.use(express.static(path.join(__dirname, "client", "build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => console.log(`Server running on port ${port}`));
