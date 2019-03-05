require('./config/config')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//Agregando los controladores
app.use(require('./controllers/usuario'));


app.listen(process.env.PORT, () => {
    console.log("Escuchando el puerto ", process.env.PORT);
})

mongoose.connect(process.env.DATA_BASE, { useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

    if (err) {
        throw err;
    }
    console.log("Se pudo conectar a la base =)");

});