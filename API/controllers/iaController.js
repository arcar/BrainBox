const {askLLM} = require("../services/ollamaService");
const {extraireTags} = require("../services/tagService");
const {getConnaissanceParTag} = require("../models/connaissanceModel")
const {getAllTags} = require("../models/connaissanceModel")


async function questionIA(req,res){

    try {

        const prompt = req.body.question;
        const tagsDisponibles = await getAllTags();


        const tags = await extraireTags(prompt, tagsDisponibles);
        console.log("Tags détectés :", tags);
        const connaissances = await getConnaissanceParTag(Array.isArray(tags) ? tags : [tags]);
        console.log("Résultats Mongo :", connaissances);  

        if(connaissances.length === 0){
            return res.json({
            answer:"Je ne possède pas cette information dans ma base de connaissances."
    });

}  

       let contexte = connaissances.map(k => {
        return `--- CONNAISSANCE ---

Titre :
${k.title}
Information :
${k.content}
Tags :
${k.tags.join(", ")}
--- FIN ---`;

}).join("");


        const promptIA = `

Tu es BrainBox.

Tu dois respecter les règles suivantes.

RÈGLE 1
Le CONTEXTE est la seule source d'information autorisée.

RÈGLE 2
Tu n'as absolument pas le droit d'utiliser tes connaissances personnelles.

RÈGLE 3
Si la réponse n'est pas écrite dans le CONTEXTE, répond uniquement :

Je ne possède pas cette information dans ma base de connaissances.

RÈGLE 4
N'invente jamais une commande, un exemple ou une explication.

CONTEXTE :

${contexte}

QUESTION :

${prompt}

Réponse :

`;
        console.log(promptIA);
        const answer = await askLLM(promptIA);

        res.json({
            answer,
            tags,
            connaissances
        });

    } catch(error){

        res.status(500).json({
            error:error.message
        });

    }
}


module.exports = {questionIA};