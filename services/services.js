// const DATOS_USUARIOS  = require('../models/models')


const { log } = require('console')
const fs = require('fs')

const leer = ()=>{
    const USER_DATA = JSON.parse(fs.readFileSync('./models/UserData.json','utf-8'))
    return USER_DATA
}

const escribir = (datoNoJson)=>{
    let datoParseado = JSON.stringify(datoNoJson,null,2) 
    fs.writeFileSync('./models/UserData.json',datoParseado)
}



const obtenerUsuarioById = (id)=>{
    let user;
    /* DATOS_USUARIOS.forEach(usuario => { */
    let USER_DATA =leer();
    USER_DATA.forEach(usuario => {
        if(usuario.id===Number(id)){
            user = usuario
        }
    });
    return user
}

const obtenerUsuarioByEdad = (edad)=>{
    // let users = DATOS_USUARIOS.filter(usuario=>{
    let USER_DATA =leer();
    let users = USER_DATA.filter(usuario=>{
        return usuario.edad > edad;
    })
    return users
}

// console.log(obtenerUsuarioByEdad(55));


const obtenerUsuarioByApellido = (apellido)=>{
    // let users = DATOS_USUARIOS.filter(usuario=>{
    let USER_DATA =leer();
    let users = USER_DATA.filter(usuario=>{
        return usuario.apellido.toLowerCase() === apellido.toLowerCase();
    })
    return users
}


const obtenerUsuarios =()=>{
    // let users = DATOS_USUARIOS;
    let USER_DATA =leer();
    let users = USER_DATA;
    return users
}

const obtenerIdMax = ()=>{
    let idFull =[]
    // DATOS_USUARIOS.forEach(usuario=>idFull.push(usuario.id))
    let USER_DATA =leer();
    USER_DATA.forEach(usuario=>idFull.push(usuario.id))
    return Math.max(...idFull)
}

const guardarUsuarios =(userDataForm)=>{
    let idMax = obtenerIdMax()
    /* let userData =  */
    let USER_DATA =leer();
    let user = {
        id:idMax+1,
        nombre:userDataForm.nombre,
        apellido:userDataForm.apellido,
        username:userDataForm.username,
        password:userDataForm.hash,
        email:userDataForm.email,
        telefono:userDataForm.telefono,
        codigoPostal:userDataForm.codigoPostal,
        pais:userDataForm.pais,
        genero:userDataForm.genero,
        date:userDataForm.date,
        edad:calcularEdad(userDataForm.date),
    }

    //nombre,apellido,username,hash,email,telefono,codigoPostal,pais,genero,date

    USER_DATA.push(user);
    escribir(USER_DATA);
    console.log(USER_DATA);
    /* DATOS_USUARIOS.push(user)    
    console.log(DATOS_USUARIOS); */
}
// console.log(guardarUsuarios());


// console.log(obtenerUsuarioByApellido('Miranda'));


const calcularEdad=(fecha)=> {
    var hoy = new Date();
    var fechaNacimiento = new Date(fecha);
    var edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    var m = hoy.getMonth() - fechaNacimiento.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }

    return edad;
}

/* const comprobarUsername = (username)=>{
    let USER_DATA =leer();
    let userFound = USER_DATA.findIndex(usuario=>{
       return usuario.username == username
    })
    console.log(userFound);
    return userFound
} */

// comprobarUsername("caro")

const comprobarUsername = (username)=>{
    let USER_DATA =leer();

    const userFound = USER_DATA.filter(usuario=>{
       return usuario.username == username
    })
    // console.log(userFound);
    return userFound
}

// comprobarUsername("cardo")

module.exports={obtenerUsuarioById,obtenerUsuarioByEdad,obtenerUsuarioByApellido,obtenerUsuarios,guardarUsuarios,leer,escribir,comprobarUsername}
