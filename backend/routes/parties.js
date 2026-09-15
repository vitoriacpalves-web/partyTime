require('dotenv-safe').config();
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const blackList = require("../utils/blackList");

const partyController = require("../controllers/partyController");


function verifyJWT(req, res, next) {

    try {
        let token = req.headers["authorization"];
        if (!token) {
            res.status(401).json({ msg: "Acesso negado." });
            return;
        }

        token = token.replace("Bearer ", "");

        if (blackList[token]) return res.status(403);

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            if (!decoded) return res.status(403)
            res.locals.token = decoded;
            return next();

        } catch (error) {
            res.status(403).json({ msg: error.message });
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({ msg: "Não foi possível verificar o token." })
    }
}

//FUNÇÕES
router
    .route("/parties")
    .post(verifyJWT, (req, res) => partyController.create(req, res));

router
    .route("/parties")
    .get(verifyJWT, (req, res) => partyController.getAll(req, res));

router
    .route("/parties/search/:title")
    .get(verifyJWT, (req, res) => partyController.getByTitle(req, res));

router
    .route("/parties/:id")
    .get(verifyJWT, (req, res) => partyController.get(req, res));

router
    .route("/parties/:id")
    .delete(verifyJWT, (req, res) => partyController.delete(req, res));

router
    .route("/parties/:id")
    .put(verifyJWT, (req, res) => partyController.update(req, res));

module.exports = router;