const express = require('express');
const bcrypt = require('bcrypt');
const _ = require("underscore");
const app = express();
const Usuario = require('../models/usuario')



app.get("/usuario", (req, res) => {
    let cantidad = req.query.cantidad || 5;
    let desde = req.query.desde || 0;
    cantidad = Number(cantidad);
    desde = Number(desde);

    Usuario.find({ estado: true }, 'role estado nombre google email')
        .limit(cantidad).skip(desde).exec((err, listUusarios) => {
            if (err) {
                return res.status(400).json({ valido: false, err });
            }
            Usuario.countDocuments({ estado: true }, (err, cantidad) => {

                return res.status(200).json({ valido: true, listUusarios, cantidad });
            })

        });
});

app.put("/usuario/:id", (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'estado']);

    Usuario.update({ _id: id }, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, usuarioUpd) => {

        if (err) {
            //Se pone un return para que el codigo no se siga ejecutando
            return res.status(400).json({ valido: false, err });
        }
        res.status(200).json({
            "mensaje": "Usuario actualizado con exito",
            usuarioUpd
        });
    })

    /*Usuario.findOneAndUpdate(id, body, {
        new: true,
        runValidators: true,
        context: 'query'
    }, (err, usuarioUpd) => {

        if (err) {
            //Se pone un return para que el codigo no se siga ejecutando
            return res.status(400).json({ valido: false, err });
        }
        res.status(200).json({
            "mensaje": "Usuario actualizado con exito",
            usuarioUpd
        });
    }) */

});
app.delete("/usuario/:userId", (req, res) => {

    var userId = req.params.userId;


    Usuario.findOneAndUpdate({ _id: userId }, { estado: false }, (err, usuarioEliminado) => {
        if (err) {
            //Se pone un return para que el codigo no se siga ejecutando
            return res.status(400).json({ valido: false, err });
        } else if (!usuarioEliminado) {

            return res.status(400).json({
                valido: false,
                err: {
                    message: 'El usuario no existe dentro del sistema'
                }
            });
        } else {
            return res.status(200).json({
                valido: true,
                usuarioEliminado
            })
        }

    });

});
app.post("/usuario", (req, res) => {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    usuario.save((err, usuarioSaved) => {
        if (err) {
            //Se pone un return para que el codigo no se siga ejecutando
            return res.status(400).json({ valido: false, err });
        }
        res.status(200).json({
            valido: true,
            usuarioGuardado: usuarioSaved
        })

    })

});

module.exports = app;