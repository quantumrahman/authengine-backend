// import modules -------------------------------------->
import 'dotenv/config';
import app from './app.js';
import mongoose from 'mongoose';

// server function ------------------------------------->
const startServer = async () => {
    try {
        const port = Number(process.env.PORT) || 4000;
        const server = app.listen(port, () => {
            console.log(
                `Server started successfully. Running on http://localhost:${port}`,
            );
        });

        const gracefulShutdown = async (signal) => {
            console.log(`Recived signal ${signal}. Shutting down the server.`);

            server.close(async (err) => {
                if (err) {
                    console.log('Error closing server.', err);
                    process.exit(1);
                }

                console.log('Server is closed.');

                try {
                    await mongoose.connection.close();
                    console.log('Mongoose connection is closed.');
                    process.exit(0);
                } catch (error) {
                    console.log('Error closing mongoose.', error.message);
                    process.exit(1);
                }
            });

            setTimeout(() => {
                console.log(
                    'Could not close connections in time, forcefully shutting down',
                );

                process.exit(1);
            }, 10000);
        };

        process.on('SIGINT', () => gracefulShutdown('SIGINT'));
        process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    } catch (error) {
        console.log('Server cannot start properly!', error.message);
        process.exit(1);
    }
};

// start server ---------------------------------------->
startServer();
