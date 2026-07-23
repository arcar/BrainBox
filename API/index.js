require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const express = require('express');
const PORT = 3000;

const app = express();
app.use(express.json());


const { connectToDatabase, getClient, getDatabase } = require('./config/mongo');
const dbMiddleware = require('./middleware/dbMiddleware');
const connaissanceRoute = require("./routes/connaissanceRoute")

// route TEST
app.get('/test', (req, res) => {
    return res.status(200).json(
        { "status": "Serveur Fonctionnel" }
    )
})

app.use(connaissanceRoute);

// Démarrer le serveur
app.listen(PORT, async () => {
    await connectToDatabase()
    console.log(`Serveur démarré sur le port ${PORT}`);
});