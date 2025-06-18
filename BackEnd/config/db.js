import mongoose from 'mongoose';

export const connectDB= async () => {
    await mongoose.connect("mongodb+srv://Raghvendra:TBRtBiGn19AZLZhE@cluster0.ubpdb3i.mongodb.net/food-del2").then(()=>console.log("db connected"))
}