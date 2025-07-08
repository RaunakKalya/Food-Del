import mongoose from "mongoose";

 export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://raunakk0104:Raunak8200@cluster0.kjqqu0x.mongodb.net/food-del') .then(()=>console.log("DB Connected"));
}