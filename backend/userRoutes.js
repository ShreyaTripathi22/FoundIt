import express from "express";
import { getDb } from "./connect.js";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });



let userRoutes = express.Router()
const SALT_ROUNDS =6;

// #1- Retrieve All
// http://localhost:3000/users

userRoutes.route("/users").get(async (request, response) => {
    let db = getDb()
    let data = await db.collection("Users").find({}).toArray()
    if(data.length >0){
        response.json(data)
    }
        else{
            response.status(404).json({ error: "Data was not found :(" });
        }
})

//#2 Retrieve One
userRoutes.route("/users/:id").get(async (request, response) => {
    let db = getDb()
    let data = await db.collection("Users").findOne({_id: new ObjectId(request.params.id)});
     if(Object.keys(data).length>0){
        response.json(data)
    }
        else{
            response.status(404).json({ error: "Data was not found :(" });
        }
})

//#3 create one
userRoutes.route("/users").post (async (request, response) => {
    let db = getDb()

    const takenEmail = await db.collection("Users").findOne({email: request.body.email});

    if(takenEmail){
        response.json({message:"The email is taken"})
    }else{
        const hash = await bcrypt.hash(request.body.password, SALT_ROUNDS);

        let mongoObject = {
            name : request.body.name,
            email : request.body.email,
            password: hash,
            posts: []
            
        }
        let data = await db.collection("Users").insertOne(mongoObject)
        response.json(data)
    
    }    
})

userRoutes.route("/users/:id").put(async (request, response)=>{
    let db = getDb()
    let mongoObject = {
        $set: {
            name : request.body.name,
            email : request.body.email,
            password: request.body.password,
            posts: request.body.posts    
        }
    }
    let data = await db.collection("Users").updateOne( { _id: new ObjectId(request.params.id) }, 
    mongoObject)
    response.json(data)
})

//#4 delete one

userRoutes.route("/users/:id").delete(async (request, response) => {
    let db = getDb();
    let data = await db.collection("Users").deleteOne({_id: new ObjectId(request.params.id)});
    response.json(data)
});


// 6 LOGIN

userRoutes.route("/users/login").post (async (request, response) => {
    let db = getDb()

    const user = await db.collection("Users").findOne({email: request.body.email});

    if(user){
        let confirmation = await bcrypt.compare(request.body.password, user.password)
        if(confirmation){
            const token = jwt.sign(user,process.env.SECRET_KEY)
            response.json({success:true, token})
        }else{
            response.json({success:false, message:"Incorrect Password"})
        }

    }else{
        response.json({success:false, message:"User not found"})
    }    
})


export default userRoutes;

