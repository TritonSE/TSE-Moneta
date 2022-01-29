/**
 * Schema for Groups with the properties
 * fullName (string)
 * email (string)
 * companyID (string)
 * password (string)
 * Timestamps
 *
 * The password is hashed
 *
 * @summary Users schema with hashed password
 * @author Pratyush Chand
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, index: true },
    email: { type: String, required: true, index: true },
    companyID: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (salt_err, salt) => {
    if (salt_err) return next(salt_err);

    // hash the password with salt
    return bcrypt.hash(user.password, salt, (hash_err, hash) => {
      if (hash_err) return next(hash_err);

      // replace password with hashed password
      user.password = hash;
      return next();
    });
  });
});

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = { ...this.getUpdate() };

  if (update.password) {
    const salt = bcrypt.genSaltSync();
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
});

UserSchema.methods.verifyPassword = (enteredPassword) =>
  bcrypt.compare(enteredPassword, this.password, (err, matchBool) => {
    if (err) throw err;
    console.log(matchBool);
  });

const User = mongoose.model("users", UserSchema);

module.exports = User;
