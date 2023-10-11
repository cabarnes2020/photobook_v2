import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
//Connect to MongoDB Database
const MongoDB_Connection_String = `mongodb://localhost`;
async function connectToMongoDB(connectionString) {
    await mongoose.connect(connectionString);
    console.log('Connected to MongoDB database!');
}
try {
    await connectToMongoDB(MongoDB_Connection_String);
}
catch (e) {
    console.log('Error connecting to MongoDB', e);
}
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
});
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
//# sourceMappingURL=index.mjs.map