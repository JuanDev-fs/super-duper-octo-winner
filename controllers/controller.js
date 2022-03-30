const { json } = require('express/lib/response');
const {
    obtenerUsuarioById,
    obtenerUsuarioByEdad,
    obtenerUsuarioByApellido,
    obtenerUsuarios,
    guardarUsuarios,
    } = require('../services/services');




/* const holaHome =(req,res)=>{
    let title = 'Home'
    res.render('vistas/bienvenido.ejs',{title:title})
} */

const holaHome =(req,res)=>{
    let title = 'Home'
    res.render('vistas/home.ejs',{title:title})
}

const holaUsuario=(req,res)=>{
    let title = 'Usuarios'
    let usuarios=obtenerUsuarios();
    // console.log(usuarios);
    // let objetoJson = JSON.stringify(usuarios,null,2)
    // res.send(obtenerUsuarios())
    // console.log(objetoJson);
    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:objetoJson})

    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios})
}
const holaUsuarioId=(req,res)=>{
    let id = req.params.id

    let title = 'Usuario Id'
    let usuarios=obtenerUsuarioById(Number(id));

    // res.send(obtenerUsuarioById(Number(id)))

    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios})

}

const holaUsuarioEdad=(req,res)=>{
    let edad = req.params.edad
    let title = 'Usuario por Edad'
    let usuarios = obtenerUsuarioByEdad(Number(edad));
    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios,edad:edad})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios,edad:edad})

    // res.send(obtenerUsuarioByEdad(Number(edad)))
}

const  holaUsuarios=(req,res)=>{
    let apellido = req.params.apellido;
    let title = 'Usuario de Apellido'
    let usuarios=obtenerUsuarioByApellido(apellido);
    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios,apellido:apellido})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios,apellido:apellido})

    // res.send(obtenerUsuarioByApellido(apellido))

}


//LOGIN
const Login=(req,res)=>{
    let title = 'Login'
    res.render('vistas/login.ejs',{title:title,/*  usuarios:usuarios,apellido:apellido */})
}

const ProcessLogin=(req,res)=>{
/*     let username = req.body.username;
    let password = req.body.password;
    let remember = req.body.remember; */
    let {username,password,remember}=req.body;
    
    const user ={
        username,password,remember
    }
    console.log(user);
    res.send(user)
    // res.render('vistas/login.ejs',{title:title,/*  usuarios:usuarios,apellido:apellido */})
}


const ProcessLoginValidation = (req,res,errors)=>{
    if (!errors.isEmpty()) {
        let title = 'Login'
        const {username,password} = req.body;
        const usuarioEnviado={username,password}
        let validaciones = errors.array()
        res.render('vistas/login',{title:title,usuario:usuarioEnviado,validaciones:validaciones})
    }
}



//Registro
const Register=(req,res)=>{
    let title = 'Registrarse'
    res.render('vistas/register.ejs',{title:title,/*  usuarios:usuarios,apellido:apellido */})
}

const ProcessRegister=(req,res)=>{
    let {nombre,apellido,username,password,password2,email,telefono,codigoPostal,pais,date,genero}=req.body;
        
        const user ={
            nombre,apellido,username,password,password2,email,telefono,codigoPostal,pais,date,genero
        }

        guardarUsuarios(user)
        console.log(user);
        res.send(user)
        // res.render('vistas/login.ejs',{title:title,/*  usuarios:usuarios,apellido:apellido */})
    }

const ProcessRegisterValidation = (req,res,errors)=>{
    if (!errors.isEmpty()) {
        let title = 'Register'
        const {nombre,apellido,username,password,password2,email,telefono,codigoPostal} = req.body;
        const usuarioEnviado={nombre,apellido,username,password,password2,email,telefono,codigoPostal}
        let validaciones = errors.array()
        res.render('vistas/register',{title:title,usuario:usuarioEnviado,validaciones:validaciones})
    } else {
        let title = 'Registo Exitoso'
        const {nombre,apellido,username,password,password2,email,telefono,codigoPostal,pais,genero,date} = req.body;
        const usuarioEnviado={nombre,apellido,username,password,password2,email,telefono,codigoPostal,pais,genero,date}
        guardarUsuarios(usuarioEnviado)
        console.log(usuarioEnviado);
        res.render('vistas/home',{title:title/* ,usuario:usuarioEnviado,validaciones:validaciones */})
            
    }

}


    

module.exports={holaHome,holaUsuario,holaUsuarioId,holaUsuarios,holaUsuarioEdad,Login,ProcessLogin,ProcessLoginValidation,Register,ProcessRegister,ProcessRegisterValidation}