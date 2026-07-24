async function extraireTags(prompt, tagsDisponibles) {


    const motsPrompt =
        prompt
        .toLowerCase()
        .split(/\s+/);



    const tagsTrouves =
        tagsDisponibles.filter(tag =>
            motsPrompt.includes(
                tag.toLowerCase()
            )

        );


    return tagsTrouves;

}


module.exports={extraireTags};