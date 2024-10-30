import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const db = async (): Promise<typeof mongoose.connection> => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_network');
        console.log('Database connected.');
        return mongoose.connection;
    } catch (error) {
        console.log('Database connection error:', error);
        throw new Error('Database connection failed');
    }
}

export default db;