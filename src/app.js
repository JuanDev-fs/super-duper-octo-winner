const express = require('express');
const app = express();
const PORT = 3000;
//agregamos body-parser
const bodyParser = require("body-parser");

//requerimos routes
const routes = require('../routes/routes')

//requerimos esxpress Validator
const { body, validationResult } = require('express-validator');

//session y cookies
const sessions = require('express-session');
const unDia = 1000*60*60*24;
const unMinuto = 1000*60;

//seteamos motor de plantillas
app.set('view engine','ejs');


//usamos body parser
app.use(bodyParser.urlencoded({extended:true}));

//usamos sesiones
app.use(sessions({
	secret: "123456",
	resave: false,
	saveUninitialized:false, //true ya depreciado config a false ver doc
	// cookie: { maxAge:unDia }
    cookie: { maxAge:unMinuto }
}));

//usar las rutas
app.use('/',routes)




//para agregar la carpeta public y asi poner style.css
/* const path= require('path');
app.use(express.static(path.join(__dirname,'../public'))); */

//iniciando servidor
app.listen(PORT,()=>{
    console.log(`Server UP on Port: ${PORT}`);
})