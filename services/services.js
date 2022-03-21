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

const obtenerIdMax = ()=>{
    let idFull =[]
    DATOS_USUARIOS.forEach(usuario=>idFull.push(usuario.id))
    return Math.max(...idFull)
}

const guardarUsuarios =(userDataForm)=>{
    let idMax = obtenerIdMax()
    /* let userData =  */
    let user = {
        id:idMax+1,
        nombre:userDataForm.nombre,
        username:userDataForm.username,
        password:userDataForm.password,
        password2:userDataForm.password2,
        email:userDataForm.email,
        telefono:userDataForm.telefono,
        pais:userDataForm.pais,
        date:userDataForm.date,
        genero:userDataForm.genero,
    }

    DATOS_USUARIOS.push(user)    
    console.log(DATOS_USUARIOS);
}
// console.log(guardarUsuarios());


// console.log(obtenerUsuarioByApellido('Miranda'));

module.exports={obtenerUsuarioById,obtenerUsuarioByEdad,obtenerUsuarioByApellido,obtenerUsuarios,guardarUsuarios}
