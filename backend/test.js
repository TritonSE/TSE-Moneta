const mongoose = require("mongoose");
const TableData = require("./models/TableData");
const Group = require("./models/Groups");

mongoose.connect("mongodb://localhost:27017/test");

setTimeout(() => {
  const group = new Group({
    Name: "name",
    Values: [{ name: "name", type: "type" }],
  });

  group.save();

  const testTable = new TableData({
    group: group._id,
    data: "{test:'hello'}",
  });

  testTable.save();
  console.log(mongoose.connection.readyState); // prints 1
}, 2000);
