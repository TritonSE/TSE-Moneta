const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
SALT_WORK_FACTOR = 10;
const UserSchema = new mongoose.Schema({
    fullName: {type: String, required: true, index: true},
    email: {type: String, required: true, index: true},
    companyID: {type: String, required: true},
    password: {type: String, required: true},
    

},
    {timestamps: true}
);

UserSchema.pre('save', function (next){ 
    const user = this;
    // hashes password only if modified or new
    if (!user.isModified('password')){return next();}
    
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
    
        // hash the password with salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
    
            // replace password with hashed password
            user.password = hash;
            next();
        })
    })
});

UserSchema.methods.verifyPassword = function (enteredPassword){
    bcrypt.compare(enteredPassword, this.password, function(err, matchBool){
        if (err) throw err
        console.log(matchBool)
    })
}


module.exports = User = mongoose.model('users', UserSchema);