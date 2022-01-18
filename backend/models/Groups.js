const mongoose = require('mongoose')
const GroupSchema = new mongoose.Schema({
    Name: {type: String, required: true, index: true},
    Values: [{name: {type: String, required: true}, type:{type: String, required: true}}]
    

},
    {timestamps: true}
);


module.exports = Group = mongoose.model('groups', GroupSchema);