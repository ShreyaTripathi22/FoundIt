// backend/emailRoutes.js
import express from "express";
import {connectToServer, getDb} from "./connect.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/send-claim-email", async (req, res) => {
const { finderEmail, itemName,claimerName, claimerEmail  } = req.body;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const emailContent = `
      Hi there,

      Good news! Someone has expressed interest in claiming your found item, **${itemName}**.

      Here are the details of the person who would like to claim it:

      - **Name:** ${claimerName}
      - **Email:** ${claimerEmail}

      Please get back to them as soon as possible to arrange for the item pickup or further communication. If you need any assistance or have any questions, feel free to reach out!

      Thank you for helping with the Lost & Found community.

      Best regards,
      The FoundIt Team
    `;

    await transporter.sendMail({
      from: `"FoundIt App" <${process.env.EMAIL_USER}>`,
      to: finderEmail,
      subject: `Claim Request for Your Found Item: ${itemName}`,
      text: emailContent,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Failed to send email" });
  }
});

/*
router.post("/check-lost-match", async (req, res) => {
    const db = getDb();
    const { name, location, date, email } = req.body;
    
    console.log("Received request to check for lost match:", req.body);

    try {
      const lostDate = new Date(date);
      const threeDaysLater = new Date(lostDate);
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);
  
      const matches = await db.collection("Found Items").find({
        Name: name,
        Location: location,
        Date: {
          $gte: lostDate,
          $lte: threeDaysLater,
        },
      }).toArray();

      console.log(`Found ${matches.length} matching found items.`);
  
      if (matches.length > 0) {
        const htmlList = matches.map(item => 
          `<li><b>Date:</b> ${new Date(item.Date).toDateString()}, <b>Location:</b> ${item.Location}</li>`
        ).join('');
  
        const mailOptions = {
          from: `"FoundIt App" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: 'Possible Match Found for Your Lost Item',
          html: `
            <p>Hi,</p>
            <p>We found ${matches.length} item(s) that may match your lost item "<b>${itemName}</b>".</p>
            <ul>${htmlList}</ul>
            <p>Please visit the platform to view and possibly claim your item.</p>
            <p>- The FoundIt Team</p>
          `,
        };
  
        console.log("Sending email to:", email); // Log email sending attempt
        await transporter.sendMail(mailOptions);
        //console.log(`Email sent to ${email} about matching found items.`);
        console.log(`Email sent to ${email} about matching found items.`);
      }
  
      res.status(200).json({
        message: matches.length > 0
          ? `Match found and email sent to ${email}`
          : "No matching found items",
        matches,
      });
    } catch (error) {
      console.error("Error checking lost item match:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
*/

export default router;

