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
    dataBase = 'mongodb://pacodev:jXIsSde5YC15IIIm@cluster0-shard-00-00-jahdh.mongodb.net:27017,cluster0-shard-00-01-jahdh.mongodb.net:27017,cluster0-shard-00-02-jahdh.mongodb.net:27017/pruebas?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';
}

// ###################################
// Base de datos 
// ###################################
process.env.DATA_BASE = dataBase