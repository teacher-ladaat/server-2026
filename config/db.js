import mongoose from "mongoose";

export const connectDB = async () => {
    // ברירת מחדל שרת מקומי
    const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/storeDB';

    try {
        await mongoose.connect(DB_URI); // חזר פרומיס
        console.log(`mongo connected successfully to ${DB_URI}`);
    } catch (error) {
        console.log(`mongo connection failed`, error.message);
    }
};