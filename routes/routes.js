const express = require('express');
const router = express.Router();
//express validator
const { body, validationResult } = require('express-validator');




const {
    holaHome,
    holaUsuario,
    holaUsuarioId,
    holaUsuarios,
    holaUsuarioEdad,
    Login,
    ProcessLogin,
    ProcessLoginValidation,
    Register,
    ProcessRegister,
    ProcessRegisterValidation
    }= require('../controllers/controller')

router.get('/',holaHome)

router.get('/usuarios',holaUsuario)

router.get('/usuarios/:id',holaUsuarioId)

router.get('/usuarios/edad/:edad',holaUsuarioEdad)

router.get('/usuarios/apellido/:apellido',holaUsuarios)

router.get('/login',Login)
// router.post('/login',ProcessLogin)
router.post('/login',
body('username','ingrese un nombre de usuario valido').isLength({min:5})/* .isEmail() */,
body('password','ingrese un password valido').isStrongPassword()/* .isLength({ min: 5 }) */,

(req, res) => {
    const errors = validationResult(req);
    ProcessLoginValidation(req,res,errors) 
})




router.get('/register',Register)
// router.post('/register',ProcessRegister)
router.post('/register',
body('nombre','ingrese un nombre valido').isLength({min:3}).isAlpha(),
body('apellido','ingrese un apellido valido').isLength({min:3}).isAlpha(),
body('username','ingrese un nombre de usuario valido').isLength({min:5}),
body('email','ingrese un email valido').isEmail(),
body('password','ingrese un password valido').isStrongPassword(),

//validacion customizada verificacion si ambos password son iguales
body('password2').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Las contraseñas deben ser iguales');
    }
    return true;
  }),
// body('password2','ingrese un password valido').isStrongPassword(),
body('telefono','ingrese un telefono valido').isNumeric().isLength({min:7}),
body('codigoPostal','ingrese un Codigo Postal valido').isNumeric().isLength({min:4}),


(req, res) => {
    const errors = validationResult(req);
    ProcessRegisterValidation(req,res,errors) 
})


router.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
})

module.exports=router;
