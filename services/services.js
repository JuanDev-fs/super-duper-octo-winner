const DATOS_USUARIOS  = require('../models/models')

const obtenerUsuarioById = (id)=>{
    let user;
    DATOS_USUARIOS.forEach(usuario => {
        if(usuario.id===Number(id)){
            user = usuario
        }
    });
    return user
}

const obtenerUsuarioByEdad = (edad)=>{
    let users = DATOS_USUARIOS.filter(usuario=>{
        return usuario.edad > edad;
    })
    return users
}

// console.log(obtenerUsuarioByEdad(55));


const obtenerUsuarioByApellido = (apellido)=>{
    let users = DATOS_USUARIOS.filter(usuario=>{
        return usuario.apellido === apellido.toLowerCase();
    })
    return users
}


const obtenerUsuarios =()=>{
    let users = DATOS_USUARIOS;
    return users
}


// console.log(obtenerUsuarioByApellido('Miranda'));

module.exports={obtenerUsuarioById,obtenerUsuarioByEdad,obtenerUsuarioByApellido,obtenerUsuarios}
