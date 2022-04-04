const { json } = require('express/lib/response');
const {
    obtenerUsuarioById,
    obtenerUsuarioByEdad,
    obtenerUsuarioByApellido,
    obtenerUsuarios,
    guardarUsuarios,
    comprobarUsername,
    } = require('../services/services');




//bcrypt
const bcrypt = require('bcrypt');
const saltos =10;


/* const holaHome =(req,res)=>{
    let title = 'Home'
    res.render('vistas/bienvenido.ejs',{title:title})
} */

const holaHome =(req,res)=>{
    session=req.session;
    let title = 'Home'
    if(session.userid){
		let state = "logout"
		res.render('./vistas/home',{state:state,title:title})
    }else{
		let state = ""
		res.render('./vistas/home',{state:state,title:title})
	}
    /* let title = 'Home' */
    /* res.render('vistas/home.ejs',{title:title}) */
}

const holaUsuario=(req,res)=>{
    let title = 'Usuarios'
    session=req.session;
    let usuarios=obtenerUsuarios();

    if(session.userid){
		let state = "logout"
		res.render('./vistas/home',{state:state,title:title, usuarios:usuarios})
    }else{
		let state = ""
		res.render('./vistas/home',{state:state,title:title, usuarios:usuarios})
	}


    // console.log(usuarios);
    // let objetoJson = JSON.stringify(usuarios,null,2)
    // res.send(obtenerUsuarios())
    // console.log(objetoJson);
    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:objetoJson})

    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios})
    /* res.render('vistas/home.ejs',{title:title, usuarios:usuarios,state:state}) */
}
const holaUsuarioId=(req,res)=>{
    let id = req.params.id
    let state = ""
    let title = 'Usuario Id'
    let usuarios=obtenerUsuarioById(Number(id));

    // res.send(obtenerUsuarioById(Number(id)))

    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios,state:state})

}

const holaUsuarioEdad=(req,res)=>{
    let edad = req.params.edad
    let state = ""
    let title = 'Usuario por Edad'
    let usuarios = obtenerUsuarioByEdad(Number(edad));
    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios,edad:edad})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios,edad:edad,state:state})

    // res.send(obtenerUsuarioByEdad(Number(edad)))
}

const  holaUsuarios=(req,res)=>{
    let apellido = req.params.apellido;
    let state = ""
    let title = 'Usuario de Apellido'
    let usuarios=obtenerUsuarioByApellido(apellido);
    // res.render('vistas/bienvenido.ejs',{title:title, usuarios:usuarios,apellido:apellido})
    res.render('vistas/home.ejs',{title:title, usuarios:usuarios,apellido:apellido,state:state})

    // res.send(obtenerUsuarioByApellido(apellido))

}


//LOGIN
const Login=(req,res)=>{
    let title = 'Login'
    let state = ""
	res.render('./vistas/login',{state:state,title:title})
    // res.render('vistas/login.ejs',{title:title,/*  usuarios:usuarios,apellido:apellido */})
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
        // let title = 'Login'
        const {username,password}=req.body;
        
        const user = comprobarUsername(username)
        console.log(user);
        if(user.length===0){
            console.log("No existe el usuario");
        } else if(!bcrypt.compareSync(password, user[0].password)){
            console.log("La Contraseña es incorrecta");
        } else {
            let title = 'login'
            session=req.session;
            session.userid=username;
            console.log(req.session)
            let state = "logout"
            res.render('./vistas/home',{title:title,state:state})
            // console.log("ingreso correctamente");
        }

}



//Registro
const Register=(req,res)=>{
    let title = 'Registrarse'
    let state = ""
    res.render('vistas/register.ejs',{title:title,state:state/*  usuarios:usuarios,apellido:apellido */})
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
        let state = ""
        const {nombre,apellido,username,password,password2,email,telefono,codigoPostal} = req.body;
        const usuarioEnviado={nombre,apellido,username,password,password2,email,telefono,codigoPostal}
        let validaciones = errors.array()
        res.render('vistas/register',{title:title,state:state,usuario:usuarioEnviado,validaciones:validaciones})
    } else {
        let title = 'Registo Exitoso'
        let state = ""
        const {nombre,apellido,username,password,email,telefono,codigoPostal,pais,genero,date} = req.body;
        console.log(password);
        const hash = bcrypt.hashSync(password,saltos)
        console.log(hash);
        const usuarioEnviado={nombre,apellido,username,hash,email,telefono,codigoPostal,pais,genero,date}
        guardarUsuarios(usuarioEnviado)
        console.log(usuarioEnviado);
        res.render('vistas/home',{title:title,state:state/* ,usuario:usuarioEnviado,validaciones:validaciones */})
            
    }

}


    

module.exports={holaHome,holaUsuario,holaUsuarioId,holaUsuarios,holaUsuarioEdad,Login,ProcessLogin,ProcessLoginValidation,Register,ProcessRegister,ProcessRegisterValidation}