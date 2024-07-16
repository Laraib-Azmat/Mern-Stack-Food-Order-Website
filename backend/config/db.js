import mongoose from "mongoose";

 export const connectDB = async ()=>{
    mongoose.connect("mongodb+srv://foodOrderWebsite:foodOrderWebsite0324@cluster0.dzvikk5.mongodb.net/food-order")
    .then(()=>console.log("Database connected"))
}