const valueSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true}
});

const GroupSchema = new mongoose.Schema({
    Name: {type: String, required: true, index: true},
    Values: [valueSchema]
    

},
    {timestamps: true}
);


module.exports = Group = mongoose.model('groups', GroupSchema);