const axios = require("axios");


const OLLAMA_URL = process.env.OLLAMA_URL;


async function askLLM(prompt){

    const response = await axios.post(
        `${OLLAMA_URL}/api/generate`,
        {
            model:"qwen2.5:3b",
            prompt,
            stream:false,
            options:{temperature:0},
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