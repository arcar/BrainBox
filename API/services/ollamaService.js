const axios = require("axios");


async function askLLM(prompt){

    try {

        const response = await axios.post(
            "http://localhost:11434/api/generate",
            {
                model: "gemma4:e4b",
                prompt: prompt,
                stream: false
            }
        );


        return response.data.response;


    } catch(error){

        console.error(
            "Erreur Ollama :",
            error.message
        );

        throw new Error("Impossible de contacter le modèle IA");
    }
}


module.exports = {
    askLLM
};