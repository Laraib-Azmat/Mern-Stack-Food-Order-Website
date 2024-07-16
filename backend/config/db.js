import mongoose from "mongoose";

 export const connectDB = async ()=>{
    mongoose.connect("mongodb+srv://")
    .then(()=>console.log("Database connected"))
}
