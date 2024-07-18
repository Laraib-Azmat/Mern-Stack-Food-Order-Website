import mongoose from "mongoose";

 export const connectDB = async ()=>{
    mongoose.connect("mongo\\r")
    .then(()=>console.log("Database connected"))
}
