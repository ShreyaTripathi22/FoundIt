
import {connectToServer, getDb} from "./connect.js";
import express from "express";
import cors from "cors";
import postRoutes from './postRoutes.js';
import userRoutes from './userRoutes.js';
import emailRoutes from "./emailRoutes.js";
import nodemailer from "nodemailer";
import fetch from 'node-fetch';
import dotenv from 'dotenv';


import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config({ path: './config.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req,file,cb){
        cb(null, Date.now()+ '-' + file.originalname)
    }
})

const upload = multer({storage})

app.post("/single", upload.single("image"), async (req,res)=>{
    const db = getDb();

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ error: "No file uploaded" });
    }
  
    const { originalname, filename, path } = req.file;
  
    const newPost = {
        Name: req.body.name,
        Description: req.body.description,
        Location: req.body.location,
        Image: filename, // or originalname if you prefer
        Date: new Date(req.body.date),
        Email: req.body.email
    };

  
    try {
      console.log("Inserting new post into database:", newPost); // log the post data
      const result = await db.collection("Found Items").insertOne(newPost);

      /*
      //START
      await fetch("http://localhost:3000/api/email/check-lost-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: req.body.name,
          location: req.body.location,
          date: req.body.date,
          email: req.body.email
        }),
      });
      //END
      */

      //CHECKING FOR EXISTING LOST ITEM DATA
      const lostDateStart = new Date(newPost.Date);
    lostDateStart.setDate(lostDateStart.getDate() - 3); // match within 3 days before

    console.log("Searching for matching lost items...");
    const matchingLostItems = await db.collection("Lost Items").find({
      Name: newPost.Name,
      Location: newPost.Location,
      Date: {
        $gte: lostDateStart,
        $lte: newPost.Date
      }
    }).toArray();

    console.log(`Found ${matchingLostItems.length} matching lost items`);

    if (matchingLostItems.length > 0) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      for (const lostItem of matchingLostItems) {
        const mailOptions = {
          from: process.env.EMAIL,
          to: lostItem.Email,
          subject: 'A possible match for your lost item!',
          html: `
            <p>Hi,</p>
            <p>A newly found item matches your lost item "<b>${lostItem.Name}</b>" reported at "<b>${lostItem.Location}</b>".</p>
            <p>Please check the platform for more details and claim it if it's yours.</p>
          `
        };

        try {
          await transporter.sendMail(mailOptions);
          console.log(`Email sent to ${lostItem.Email}`);
        } catch (emailErr) {
          console.error(`Failed to send email to ${lostItem.Email}`, emailErr);
        }
      }
    }

    //END 

      res.status(201).json(result);
    } catch (err) {
      console.error("Error inserting post:", err); // log error message

      res.status(500).json({ error: "Failed to save post" });
    }
});

app.post("/lost", upload.single("image"), async (req, res) => {
  const db = getDb();

  if (!req.file) {
    console.warn("No image uploaded — proceeding without image.");
  }

  const { originalname, filename } = req.file || {};

  const newLostItem = {
      Name: req.body.itemName,
      Description: req.body.description,
      Location: req.body.location,
      Image: filename || null,
      Date: new Date(req.body.date),
      Email: req.body.email
  };

  try {
      console.log("Inserting lost item into database:", newLostItem);
      const result = await db.collection("Lost Items").insertOne(newLostItem);

      //CHECKING FOR EXISTING LOST ITEM DATA
      /*const lostDate = new Date(req.body.date);
      const threeDaysLater = new Date(lostDate);
      threeDaysLater.setDate(threeDaysLater.getDate() + 3);

      const matchingFoundItems = await db.collection("Found Items").find({
        Name: newLostItem.Name,
        Location: newLostItem.Location,
        Date: {
          $gte: lostDate,
          $lte: threeDaysLater
        }
      }).toArray();

      if (matchingFoundItems.length > 0) {
        // Send email to the user who reported the lost item
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });

        const mailOptions = {
          from: process.env.EMAIL,
          to: newLostItem.Email,
          subject: 'Possible Match Found for Your Lost Item',
          html: `
            <p>Hi,</p>
            <p>We found ${matchingFoundItems.length} item(s) that may match your lost item "<b>${newLostItem.Name}</b>".</p>
            <ul>
              ${matchingFoundItems.map(item => `<li><b>Date:</b> ${item.Date.toDateString()}, <b>Location:</b> ${item.Location}</li>`).join('')}
            </ul>
            <p>Please visit the platform to view and possibly claim your item.</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${newLostItem.Email} about matching found items.`);
      }*/
    //END 

    
      res.status(201).json(result);

  } catch (err) {
      console.error("Error inserting lost item:", err);
      res.status(500).json({ error: "Failed to save lost item" });
  }
});


app.use('/', postRoutes);
app.use('/', userRoutes);
app.use("/api/email", emailRoutes);

app.listen(PORT, () =>{
    connectToServer()
    console.log(`Server is ruuning on port ${PORT}`) 
})


