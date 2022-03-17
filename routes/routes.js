const express = require('express');
const router = express.Router();


const {
    holaHome,
    holaUsuario,
    holaUsuarioId,
    holaUsuarios,
    holaUsuarioEdad,
    Login,
    ProcessLogin,
    Register
    }= require('../controllers/controller')

router.get('/',holaHome)

router.get('/usuarios',holaUsuario)

router.get('/usuarios/:id',holaUsuarioId)

router.get('/usuarios/edad/:edad',holaUsuarioEdad)

router.get('/usuarios/apellido/:apellido',holaUsuarios)

router.get('/login',Login)
router.post('/login',ProcessLogin)

router.get('/register',Register)

module.exports=router;
