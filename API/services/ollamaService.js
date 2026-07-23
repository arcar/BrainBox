const axios = require("axios");


const OLLAMA_URL = process.env.OLLAMA_URL;


async function askLLM(prompt){

    const response = await axios.post(
        `${OLLAMA_URL}/api/generate`,
        {
            model:"llama3.2:3b",
            prompt,
            stream:false
        },
         {
        timeout:120000
    }
    );

    return response.data.response;
}


module.exports = {
    askLLM
};