const { response } = require("express")


const esAdminPerfil = ( req, res = response, next ) => {

    //Nota: es importante saber que como declaramos la validacion del jwt ya establecemos la informacion que requerimos de el usuario y podemos encontrar en la req.usuario  
    
    if (!req.usuario) {
        return res.status(500).json({
            msg: ' Se quiere verificar el perfil sin validar el token primero'
        })
    }
    const { profile_id, nombre } = req.usuario

    if (profile_id != 1 || profile_id != 2 ) {
        return res.status(401).json({
            msg:`${nombre} no es administrador - No puede realizar esta funcion`
        })
    }
    next()
}

const tienePerfil = ( ...perfiles ) =>{
    return (req, res = response, next) =>{
        console.log(perfiles)
        
        if (!req.usuario) {
            return res.status(500).json({
                msg: ' Se quiere verificar el perfil sin validar el token primero'
            })
        }

        if (!perfiles.includes( req.usuario.profile_id )) {
            return res.status(401).json({
                msg: `El servicio requiero alguno de estos perfiles ${perfiles}`
            })
        }
        next()
    }

}

module.exports = { 
    esAdminPerfil,
    tienePerfil
}