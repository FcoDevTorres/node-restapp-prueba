 const mongoose = require('mongoose');
 const uniqueValidator = require('mongoose-unique-validator');


 let Schema = mongoose.Schema;
 let roles = {
     values: ['USER_ROLE', 'ADMIN_ROLE'],
     message: 'El rol {VALUE} no es válido'
 }

 let usuarioSchema = new Schema({
     nombre: {
         type: String,
         required: [true, 'El nombre es obligatorio']
     },
     email: {
         type: String,
         unique: true,

         required: [true, 'El correo es obligatorio']
     },
     password: {
         type: String,
         required: [true, 'La contraseña es obligatoria']
     },
     img: {
         type: String,
         required: false
     },
     role: {
         type: String,
         enum: roles,
         default: 'USER_ROLE'
     },
     estado: {
         type: Boolean,
         default: true
     },
     google: {
         type: Boolean,
         default: false
     }

 });

 //Aqui eliminamos los objetos que no queremos que se muestren cuando hacen un TOJSON

 usuarioSchema.methods.toJSON = function() {
     let usuario = this;
     let usuarioObj = this.toObject();
     delete usuarioObj.password;
     delete usuarioObj.__v;

     return usuarioObj;
 }
 usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

 module.exports = mongoose.model('Usuario', usuarioSchema);