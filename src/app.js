const express = require('express');
const app = express();
const PORT = 3000;
//agregamos body-parser
const bodyParser = require("body-parser");

//requerimos el modulo routes
const routes = require('../routes/routes')

//requerimos esxpress Validator
const { body, validationResult } = require('express-validator');

//seteamos motor de plantillas
app.set('view engine','ejs');


//usamos body parser
app.use(bodyParser.urlencoded({extended:true}));

//usar las rutas
app.use('/',routes)




//para agregar la carpeta public y asi poner style.css
/* const path= require('path');
app.use(express.static(path.join(__dirname,'../public'))); */

//iniciando servidor
app.listen(PORT,()=>{
    console.log(`Server UP on Port: ${PORT}`);
})