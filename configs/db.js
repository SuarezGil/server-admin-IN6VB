'use strict';

import mongoose from "mongoose";

const dbConnection = async() => {
    try {
        mongoose.Connection.on('error', ()=> {
            console.log('MongoDB no se pudo conectar a mongoDB');
            mongoose.disconnect();
        })
        mongoose.Connection.on('connecting', ()=> {
            console.log('MongoDB Intentando conectar a mongoDB');
        })
        mongoose.Connection.on('connected', ()=> {
            console.log('MongoDB conectado a mongoDB');
        })
        mongoose.Connection.on('open', ()=> {
            console.log('MongoDB conectado a la base de datos kinalSports');
        })
        mongoose.Connection.on('reconnected', ()=> {
            console.log('MongoDB reconectando a mongoDB');
        })
        mongoose.Connection.on('disconnected', ()=> {
            console.log('MongoDB desconectando a mongoDB');
        })
        
        await mongoose.connect(process.env.URI_MONGO, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize:10
        })
    } catch (error) {
        console.log(`Error al conectar la db: ${error}`)
    }
}

const gracefulShutdown = async (signal)=> {
    console.log(`MongoDB Received ${signal}. Closing database connection...`);
    try {
        await mongoose.connection.close();
        console.log('MongoDB Database connection closed sucessfully');
        process.exit();
    } catch (error) {
        console.error(`MongoDB Error during graceful shutdown:`, error.message);
        process.exit();
    }
}

process.on('SIGINT', ()=> gracefulShutdown('SIGINT'));
process.on('SIGTERM', ()=> gracefulShutdown('SIGTERM'));
process.on('SIGURS2', ()=> gracefulShutdown('SIGURS2'));