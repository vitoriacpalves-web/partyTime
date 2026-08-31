require('dotenv-safe').config();
const mongoose = require("mongoose")


async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("conectado ao banco")
    } catch (error) {
        console.log(`Erro: ${error}`);
    }
}

module.exports = main;