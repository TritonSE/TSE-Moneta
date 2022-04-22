/**
 * Routes for automatically sending emails with different templates. Email sender address and
 * authentication information is stored in the .env file.
 * POST /email/registerOrg/:id
 * POST /email/addUser/:id
 * @summary Automatic email sending routes
 * @author William Wu
 */

const express = require("express");
const router = express.Router();

const ObjectId = require("mongodb").ObjectId;
const Organization = require("../models/Organizations");
const User = require("../models/Users");

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const oAuth2Client = new OAuth2(
  process.env.ADMIN_OAUTH2_CLIENT_ID,
  process.env.ADMIN_OAUTH2_CLIENT_SECRET,
  process.env.ADMIN_OAUTH2_REDIRECT_URL
);
oAuth2Client.setCredentials({
  refresh_token: process.env.ADMIN_OAUTH2_REFRESH_TOKEN,
});

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport(
  {
    host: "smtp.gmail.com",
    auth: {
      type: "OAuth2",
      user: process.env.ADMIN_EMAIL_ADDRESS,
      clientId: process.env.ADMIN_OAUTH2_CLIENT_ID,
      clientSecret: process.env.ADMIN_OAUTH2_CLIENT_SECRET,
      refreshToken: process.env.ADMIN_OAUTH2_REFRESH_TOKEN,
      accessToken: oAuth2Client.getAccessToken(),
    },
    secure: true,
  },
  {
    from: process.env.ADMIN_EMAIL_ADDRESS,
  }
);

router.post("/registerOrg/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const org = await Organization.findById(id).exec();
    if (org === null) {
      return res.status(404).end();
    }
    const { Name, Status } = org;
    await transporter.sendMail({
      to: process.env.ADMIN_EMAIL_ADDRESS,
      subject: "New org has signed up",
      text: `New org has signed up\nOrg name: ${Name}\nStatus: ${Status}`,
      html: `New org has signed up<br>Org name: ${Name}<br>Status: ${Status}`,
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

router.post("/addUser/:id", async (req, res) => {
  try {
    const id = new ObjectId(req.params.id);
    const user = await User.findById(id).exec();
    if (user === null) {
      return res.status(404).end();
    }
    const { fullName, email } = user;
    await transporter.sendMail({
      to: email,
      subject: "Welcome to TSE Moneta!",
      text: `Hi ${fullName},\n\nYou've been signed up for TSE Moneta! To create a password and complete the sign up process, please follow this link: ${process.env.HOSTING_URL}/setPassword/${id}\n\n-The Moneta Team`,
      html: `Hi ${fullName},<br><br>You've been signed up for TSE Moneta! To create a password and complete the sign up process, please follow this link: ${process.env.HOSTING_URL}/setPassword/${id}<br><br>-The Moneta Team`,
    });
    return res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
