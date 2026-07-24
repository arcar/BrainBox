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
Si le CONTEXTE ne contient aucune information permettant de répondre,
répond exactement :

Je ne possède pas cette information dans ma base de connaissances.

Sinon, répond uniquement avec les informations présentes dans le CONTEXTE.
Ne commence jamais ta réponse par cette phrase si une information existe.

RÈGLE 4
N'invente jamais une commande, un exemple ou une explication.

CONTEXTE DISPONIBLE :

${contexte}


QUESTION UTILISATEUR :

${prompt}


INSTRUCTIONS FINALES :

- Utilise uniquement le contexte fourni.
- Si la réponse existe dans le contexte, répond directement.
- N'ajoute aucune phrase de refus.
- Ne dis jamais "Je ne possède pas cette information" si le contexte contient la réponse.


RÉPONSE :

`;
        console.log(promptIA);
       let answer = await askLLM(promptIA);

console.log("REPONSE OLLAMA :", answer);


res.json({
    answer: answer,
    tags: tags,
    connaissances: connaissances
});
    } catch(error){

    console.error("ERREUR IA CONTROLLER :", error);

    res.status(500).json({
        error:error.message
    });

}
}

module.exports = {questionIA};