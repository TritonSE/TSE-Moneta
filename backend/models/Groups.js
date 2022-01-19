
/**
 * Schema for Groups with the properties
 * Name (string)
 * Values (array of json objects(name, type))
 * Timestamps
 * 
 * @summary Groups schema
 * @author Ainesh Arumugam
 */


const mongoose = require('mongoose')
const GroupSchema = new mongoose.Schema({
    Name: {type: String, required: true, index: true},
    Values: [{name: {type: String, required: true}, type:{type: String, required: true}}]
    

},
    {timestamps: true}
);


module.exports = Group = mongoose.model('groups', GroupSchema);