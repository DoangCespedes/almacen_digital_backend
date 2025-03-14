const { response } = require('express');
const Usuario = require('../model/usuario');
const bcryptjs = require('bcryptjs');
const Empleado = require('../model/empleado');

const login = async(req, res = response) => {
    const { user_name , password } = req.body;

    try {
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ 
            where: { user_name },
            attributes: ['user_id', 'user_name', 'password', 'first_name', 'last_name', 'status', 'profile_id'],
        });

        console.log('Usuario Encontrado:', usuario);
        if (!usuario) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - NOMBRE'
            });
        }

        // Si el usuario está activo
        if (usuario.status !== 'ENABLED') {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - Status: DISABLED'
            });
        }

        // Verificar la contraseña
        const validPassword = await bcryptjs.compare(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg:'Usuario / Password no son correctos - PASSWORD'
            });
        }

        return res.status(200).json({
            usuario
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

// employeeController.js


const getEmployeeByCode = async (req, res) => {
    const { CEDEMP } = req.body;

    console.log("Valor de CEDEMP:", CEDEMP);

    if (!CEDEMP) {
        return res.status(400).json({
            msg: 'El código de empleado (CEDEMP) es obligatorio'
        });
    }

    try {
        const empleado = await Empleado.findOne({ where: { CEDEMP } });

        if (!empleado) {
            return res.status(404).json({
                msg: 'Empleado no encontrado'
            });
        }

        return res.status(200).json(empleado);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Error en el servidor'
        });
    }
};


module.exports = {
    login,
    getEmployeeByCode
};
