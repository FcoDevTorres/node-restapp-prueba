require('./config/config')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/usuario", (req, res) => {
    res.json({ "mensaje": "sopotamadreasdasds" });
});

app.put("/usuario/:user", (req, res) => {
    let usuario = req.params.user;

    res.json({
        "mensaje": "put usuario",
        usuario
    });
});
app.delete("/usuario", (req, res) => {
    res.json("delete usuario");
});
app.post("/usuario", (req, res) => {
    if (!req.body.correo) {
        res.status(500).json({
            valido: false,
            mensaje: "Esto esta de la verga"
        })
    } else {
        res.json({
            peticion: req.body
        })
    }
});
app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto ", process.env.PORT);
})