import nodemailer from "nodemailer";
import { Request, Response } from "express";

// Controller function that handles sending emails
export const sendEmail = async (req: Request, res: Response) => {
  // Extract email list, subject, and message from request body
  const { emails, subject, message } = req.body;

  try {
    // Create transporter using Gmail service for sending emails
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yourgmail@gmail.com", // sender email
        pass: "your_app_password" // Gmail app password for authentication
      }
    });

    // Email configuration object
    const mailOptions = {
      from: "yourgmail@gmail.com", // sender address
      to: emails.join(","), // multiple emails
      subject: subject, // email subject
      text: message // email message body
    };

    // Send the email using nodemailer
    await transporter.sendMail(mailOptions);

    // Return success response if email is sent
    res.status(200).json({ message: "Email sent successfully" });

  } catch (error) {
    // Handle error if email sending fails
    res.status(500).json({ message: "Email sending failed", error });
  }
};