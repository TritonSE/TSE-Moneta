/**
 * Schema for Groups with the properties
 * Name (string)
 * Values (array of json objects(name, type))
 * Timestamps
 *
 * @summary Groups schema
 * @author Ainesh Arumugam
 */

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_WORK_FACTOR = 10;

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

OrganizationSchema.pre("save", function (next) {
  const organization = this;

  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (salt_err, salt) => {
    if (salt_err) return next(salt_err);

    // hash the password with salt
    return bcrypt.hash(organization.password, salt, (hash_err, hash) => {
      if (hash_err) return next(hash_err);

      // replace password with hashed password
      organization.password = hash;
      return next();
    });
  });
});

OrganizationSchema.pre("findOneAndUpdate", async function (next) {
  const update = { ...this.getUpdate() };

  if (update.password) {
    const salt = bcrypt.genSaltSync();
    update.password = await bcrypt.hash(update.password, salt);
    this.setUpdate(update);
  }
});

OrganizationSchema.methods.verifyPassword = (enteredPassword) =>
  bcrypt.compare(enteredPassword, this.password, (err, matchBool) => {
    if (err) throw err;
    console.log(matchBool);
  });

const Organization = mongoose.model("organizations", OrganizationSchema);

module.exports = Organization;
