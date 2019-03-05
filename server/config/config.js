// ###################################
// Puerto de configuración
// ###################################
process.env.PORT = process.env.PORT || 8081

// ###################################
// Ambiente 
// ###################################
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'

var dataBase;
if (process.env.NODE_ENV === 'dev') {
    dataBase = 'mongodb://localhost:27017/cafe';
} else {
    dataBase = process.env.MONGO_URI;
}

// ###################################
// Base de datos 
// ###################################
process.env.DATA_BASE = dataBase