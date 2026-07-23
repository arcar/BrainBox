const { getDatabase } = require('../config/mongo');
const { ObjectId } = require("mongodb");

async function getAllConnaissances() {
    const resultats = await getDatabase()
        .collection("connaissance")
        .find({})
        .toArray();

    return resultats;
}

async function getConnaissanceParId(id) {
    const resultats = await getDatabase()
        .collection("connaissance")
        .findOne({_id: new ObjectId(id)});

    return resultats;
}

async function getConnaissanceParTag(tags) {
    const resultat = await getDatabase()
        .collection("connaissance")
        .find({tags: tags})
        .toArray();
    return resultat;
}

async function insertConnaissance(payload) {
    const resultats = await getDatabase()
        .collection("connaissance")
        .insertOne(payload);

    return resultats;
}

async function supprConnaissance(id) {
    const resultats = await getDatabase()
        .collection("connaissance")
        .deleteOne({_id: new ObjectId(id)});

    return resultats;
}

async function changeConnaissance(id, payload) {
    delete payload._id;
    
    const resultats = await getDatabase()
        .collection("connaissance")
        .updateOne({_id: new ObjectId(id)}, { $set: payload });

    return resultats;
}


module.exports = {getAllConnaissances, getConnaissanceParId, insertConnaissance, supprConnaissance, changeConnaissance, getConnaissanceParTag}
