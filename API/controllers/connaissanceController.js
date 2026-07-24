const { getAllConnaissances, supprConnaissance, changeConnaissance, getConnaissanceParId, insertConnaissance, getConnaissanceParTag} = require("../models/connaissanceModel")


async function allConnaissances(req, res) {
    try {

        const resultats = await getAllConnaissances();
        if (resultats) {
            return res.status(200).json(resultats);
        } else {
            return res.status(404)
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function ConnaissanceParId(req, res) {
    const {id} = req.params;
    try {
        const resultats = await getConnaissanceParId(id);
        if (resultats) {
            return res.status(200).json(resultats);
        } else {
            return res.status(404)
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function ConnaissanceParTag(req, res) {
    const {tags} = req.params;
     console.log("TAG RECU :", tags);
     const listeTags = tags.split(',');
    try {
        const resultats = await getConnaissanceParTag(listeTags);
        if (resultats) {
            return res.status(200).json(resultats);
        } else {
            return res.status(404)
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

async function addConnaissance(req, res) {

    const {
        title,
        content,
        tags,
        color,
        pinned,
        archived
    } = req.body;

    if (
        !title ||
        !content ||
        !Array.isArray(tags) ||
        !color ||
        pinned === undefined ||
        archived === undefined
    ) {
        return res.status(400).json({
            success: false,
            message: "Body malformé"
        });
    }

    const maintenant = new Date().toISOString();

    const payload = {
        title,
        content,
        tags,
        color,
        pinned,
        archived,
        createdAt: maintenant,
        updatedAt: maintenant
    };

    try {

        const resultat = await insertConnaissance(payload);

        return res.status(200).json(resultat);

    } catch (error) {

        return res.status(500).json({
            error: error.message
        });

    }
}


async function deleteConnaissance(req, res) {

    console.log("DELETE PARAMS :", req.params);

    try {

        const resultats = await supprConnaissance(req.params.id);

        console.log("RESULTAT DELETE :", resultats);

        return res.status(200).json(resultats);

    } catch (error) {

        console.error("ERREUR DELETE :", error);

        return res.status(500).json({
            error: error.message
        });

    }

}
async function modifConnaissanceParId(req, res) {
    const {id} = req.query;
    const {title, content, tags, color, pinned, archived, createdAt, updatedAt} = req.body;
    if (!title || !content || !tags || !color || pinned === undefined|| archived === undefined|| !createdAt || !updatedAt) {
    return res.status(400).json({
      success: false,
      message: "Body malformé",
    });
  }
    try {
        const payload = {title, content, tags, color, pinned, archived, createdAt, updatedAt}
        const resultats = await changeConnaissance(id, payload);
        if (resultats) {
            return res.status(200).json(resultats);
        } else  return res.status(404).json({
        success: false,
        message: "Connaissance introuvable"
    });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = { allConnaissances, ConnaissanceParId, addConnaissance, deleteConnaissance, modifConnaissanceParId, ConnaissanceParTag}
