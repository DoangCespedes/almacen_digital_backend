const express = require('express');
const cors = require('cors');
const { db } = require('../database/config');
const { PORT } = require('../config');

class Server {

    constructor(){
        this.app = express();
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.storePath = '/api/store'
        this.requestsPath = '/api/requests' 
        this.utilsPath = '/api/utils' 

        //Conectar a base de datos
        this.conectarDB()
        //Middlewares 
        this.middlewares()
        //Rutas de mi app
        this.routes();
        
    }

    async conectarDB(){
        try {
            // Autenticar conexion a la base de datos
            await db.authenticate();
            console.log("Database online")
            
        } catch (error) {
            throw new Error(error);
            
        }

        
    }

    middlewares(){
        // CORS
        this.app.use( cors());

        //lectura y parseo del body
        this.app.use(express.json() );

        //Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/user'))
        this.app.use(this.storePath, require('../routes/store'))
        this.app.use(this.requestsPath, require('../routes/request'));
        this.app.use(this.utilsPath, require('../routes/utils'));
    }

    listen(){
        this.app.listen(PORT, () => {
            console.log(`EL SERVIDOR ESTA CORRIENDO EN EL PUERTO : ${PORT}`);
        });
    }
}

module.exports = Server