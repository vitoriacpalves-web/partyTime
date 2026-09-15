require('dotenv-safe').config();
const jwt = require("jsonwebtoken");

const blackList = require("../utils/blackList");

const loginController = {

    loginValidation: async (req, res) => {

        try {
            const user = req.body.user;
            const password = req.body.password;

            if (user === "user" && password === "123456") {

                const id = 1;
                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: parseInt(process.env.JWT_EXPIRES)
                })


                return res.json({ token });
            }

            else {
                res.status(401).json({ msg: "Usuário ou senha incorretos." })
            }

        } catch (error) {
            console.log(error);
            res.status(401).json({ msg: "Credenciais inválidas." })

        }
    },

    logOut: async (req, res) => {

        try {

            let token = req.headers["authorization"];
            if (!token) res.sendStatus(401);

            token = token.replace("Bearer ", "");

            blackList[token] = true;
            setTimeout(() => delete blackList[token], parseInt(process.env.JWT_EXPIRES) * 1000);
            res.json({ token: null });

        } catch (error) {
            console.log(error);
            res.status(401).json({ msg: "Não foi possível adicionar token a blackList." })
        }
    },


};

module.exports = loginController;
