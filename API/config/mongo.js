const { MongoClient } = require('mongodb');
require('dotenv').config();


const uri = process.env.MONGODB_URI; 
const client = new MongoClient(uri);

let database;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('Connexion réussie à MongoDB Atlas.');
        database = client.db("brainbox");
        return database;
    } catch (error) {
        console.error('Échec de la connexion à MongoDB Atlas :', error);
        process.exit(1); 
    }
}


function getClient() {
    return client;
}

function getDatabase() {
    return database;
}

module.exports = { connectToDatabase, getClient, getDatabase };