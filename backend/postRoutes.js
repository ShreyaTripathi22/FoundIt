import express from "express";
import nodemailer from "nodemailer";
import { getDb } from "./connect.js";
import { ObjectId } from "mongodb";

let postRoutes = express.Router()

// #1- Retrieve All
// http://localhost:3000/posts

postRoutes.route("/posts").get(async (request, response) => {
    let db = getDb()
    let data = await db.collection("Found Items").find({}).toArray()
    if(data.length >0){
        response.json(data)
    }
        else{
            response.status(404).json({ error: "Data was not found :(" });
        }
})

//#2 Retrieve One
postRoutes.route("/posts/:id").get(async (request, response) => {
    let db = getDb()
    let data = await db.collection("Found Items").findOne({_id: new ObjectId(request.params.id)});
     if(Object.keys(data).length>0){
        response.json(data)
    }
        else{
            response.status(404).json({ error: "Data was not found :(" });
        }
})

//#3 create one
postRoutes.route("/posts").post (async (request, response) => {
    let db = getDb()
    let mongoObject = {
        name : request.body.name,
        description : request.body.description,
        location : request.body.location,
        image: request.body.image,
        date: request.body.date
    }
    let data = await db.collection("Found Items").insertOne(mongoObject)

    //CHECK IF SIMILAR ITEM IS REPORTED BEFORE 
    const { name, location, date } = request.body;
    const foundDate = new Date(date);
    const date3DaysBefore = new Date(foundDate);
    date3DaysBefore.setDate(foundDate.getDate() - 3);

    // Check for matching lost items (partial + case-insensitive)
    const lostMatches = await db.collection("Lost Items").find({
        name: { $regex: new RegExp(name, "i") },
        location: { $regex: new RegExp(location, "i") },
        date: {
            $gte: date3DaysBefore.toISOString().split("T")[0],
            $lte: date,
        }
    }).toArray();

    // Send email if a match is found
    if (lostMatches.length > 0) {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        lostMatches.forEach(async (match) => {
            const mailOptions = {
                from: process.env.GMAIL_USER,
                to: match.email, // Lost item reporter's email
                subject: "We Found an Item That Might Be Yours!",
                text: `Hi! An item similar to what you lost was recently reported found.\n\nItem: ${name}\nLocation: ${location}\nDate: ${date}\n\nPlease check the app to claim it.`,
            };
            await transporter.sendMail(mailOptions);
        });
    }

     response.json(data)
})

//#4 delete one

postRoutes.route("/posts/:id").delete(async (request, response) => {
    let db = getDb();
    let data = await db.collection("Found Items").deleteOne({_id: new ObjectId(request.params.id)});
    response.json(data)
});



export default postRoutes;

