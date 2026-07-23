const { askLLM } = require("../services/ollamaService");


async function questionIA(req,res){

    try {

        const prompt = req.body.question;


        const answer = await askLLM(prompt);


        res.json({
                answer: answer
        });


    } catch(error){

        res.status(500).json({
            error:error.message
        });
    }
}


module.exports = {
    questionIA
};