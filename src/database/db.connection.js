// import modules -------------------------------------->
import 'dotenv/config';
import mongoose from 'mongoose';

// mongoose listener ----------------------------------->
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected successfully.');
});

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error.', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected!');
});

// database function ----------------------------------->
const dbConnection = async () => {
    try {
        const { DB_USER, DB_PASS, DB_URI } = process.env;

        if (!DB_USER || !DB_PASS || !DB_URI) {
            throw new Error('Missing database credentials in .env file!');
        }

        const uri = DB_URI.replace('<db_username>', DB_USER).replace(
            '<db_password>',
            DB_PASS,
        );

        const mongooseOptions = {
            dbName: 'authengine',
            autoIndex: process.env.NODE_ENV === 'development',
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(uri, mongooseOptions);
    } catch (error) {
        console.error('Mongoose connection fail.', error.message);
        process.exit(1);
    }
};

// export module --------------------------------------->
export default dbConnection;
