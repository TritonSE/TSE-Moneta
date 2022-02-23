/**
 * Schema for Organization with the properties
 * Name (string)
 * Email (string)
 * Password (string)
 * Approved Users (Array of user reference objects)
 * status (string)
 * Timestamps
 *
 * password will be hashed
 * status defaults to pending
 *
 * @summary Organizations schema
 * @author Ainesh Arumugam
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;
/**
 * Schema for Organization with the properties
 * Name (string)
 * Email (string)
 * Password (string)
 * Approved Users (Array of user reference objects)
 * status (string)
 * Timestamps
 */
const OrganizationSchema = new mongoose.Schema(
  {
    Name: { type: String, required: true, index: true },
    Email: { type: String, required: true },
    Password: { type: String, required: true },
    ApprovedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false,
      },
    ],
    status: { type: String, required: true, default: "pending" },
  },
  { timestamps: true }
);

/**
 * Encrypts passwords to prevent plain text storage
 */
OrganizationSchema.pre("save", function (next) {
  const organization = this;

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, function(salt_err, salt) {
    if (salt_err) return next(salt_err);

    // hash the password with salt
    return bcrypt.hash(organization.Password, salt, function(hash_err, hash) {
      if (hash_err) return next(hash_err);

      // replace password with hashed password
      organization.Password = hash;
      return next();
    });
  });
});

/**
 * Makes sure passwords are encrypted on update 
 */
OrganizationSchema.pre("findOneAndUpdate", async function (next) {
  const update = { ...this.getUpdate() };

  if (update.Password) {
    const salt = bcrypt.genSaltSync();
    update.Password = await bcrypt.hash(update.Password, salt);
    this.setUpdate(update);
  }
});

/**
 * Verifies that entered password matches ecnrypted password in the db
 * 
 * @param {*} enteredPassword - entered password
 * @return matchBool - whether the entered password matches the hash stored in the database
 */
OrganizationSchema.methods.verifyPassword = function (enteredPassword) {
  bcrypt.compare(enteredPassword, this.password, (err, matchBool) => {
    if (err) return err;
    return matchBool;
  });
};

const Organization = mongoose.model("organizations", OrganizationSchema);

module.exports = Organization;
