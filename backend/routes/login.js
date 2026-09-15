const router = require("express").Router();

const loginController = require("../controllers/loginController");

//funções
router
    .route("/login")
    .post((req, res) => loginController.loginValidation(req, res));


router
    .route("/logout")
    .post((req, res) => loginController.logOut(req, res));

module.exports = router;