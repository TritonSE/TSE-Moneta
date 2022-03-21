const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const tableDataRoutes = require("./routes/tableDataRoutes");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");
const groupRoutes = require("./routes/groupRoutes");

const port = process.env.PORT || 8082;
const app = express();

connectDB();

app.get("/", (req, res) => res.send("Hello world!"));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", userRoutes);
app.use("/", organizationRoutes);
app.use("/", groupRoutes);
app.use("/", tableDataRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
