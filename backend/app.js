require('dotenv-safe').config();
const jwt = require("jsonwebtoken");
const express = require("express")
const cors = require("cors")
const app = express()


app.use(cors())

app.use(express.json())


//DB connection
const conn = require("./db/conn");
conn();

//ROUTES
const routes = require("./routes/router")

app.use("/api", routes);

app.listen(process.env.PORT, function () {
    console.log(`Servidor online na porta ${process.env.PORT}`)
})





