import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error conncecting to MongoDB:', error);
        process.exit(1);
    }
}