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
body('username','ingrese un nombre de usuario valido').isLength({min:5}),
body('password','ingrese un password valido').isStrongPassword(),
body('password2','ingrese un password valido').isStrongPassword(),
body('email','ingrese un email valido').isEmail(),
body('telefono','ingrese un telefono valido').isNumeric().isLength({min:7}),


(req, res) => {
    const errors = validationResult(req);
    ProcessRegisterValidation(req,res,errors) 
})

module.exports=router;
