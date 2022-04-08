/**
 * Collection of functions for automatically sending emails with different
 * templates. Email sender address and authentication information is stored in
 * the .env file.
 * @summary Automatic email sending utilities
 * @author William Wu
 */

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport(process.env.REACT_APP_EMAIL_SENDER_CONNECTION_URL, {
  from: "tsemoneta@gmail.com",
});

export const sendOrganizationSignUpEmail = async (name, status) => {
  try {
    await transporter.sendMail({
      to: process.env.REACT_APP_ADMIN_EMAIL_ADDRESS,
      subject: "New org has signed up",
      text: `New org has signed up\nOrg name: ${name}\nStatus: ${status}`,
      html: `New org has signed up<br>Org name: ${name}<br>Status: ${status}`,
    });
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while trying to send email: ${error.message}. Please contact ${process.env.REACT_APP_ADMIN_EMAIL_ADDRESS} for assistance.`
    );
  }
};

export const sendUserSignUpEmail = async (id, name, email) => {
  try {
    await transporter.sendMail({
      to: email,
      subject: "Welcome to TSE Moneta!",
      text: `Hi ${name},\n\nYou've been signed up for TSE Moneta! To create a password and complete the sign up process, please follow this link: TODO${id}\n\n-The Moneta Team`,
      html: `Hi ${name},<br><br>You've been signed up for TSE Moneta! To create a password and complete the sign up process, please follow this link: TODO${id}<br><br>-The Moneta Team`,
    });
  } catch (error) {
    console.error(error);
    throw new Error(
      `An error occurred while trying to send email: ${error.message}. Please contact ${process.env.REACT_APP_ADMIN_EMAIL_ADDRESS} for assistance.`
    );
  }
};
