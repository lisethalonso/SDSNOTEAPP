const express = require("express");
let router = express.Router();
const jwt = require("jsonwebtoken");
let { obtenerPorCorreo, compararContrasenias, registrarUsuario } = require("./seguridad.model");

router.post(
  '/registrarse',
  async (req, res)=>
  {
    try
    {
      const { correo, contrasenia } = req.body;
      let usuarioInsertado = await registrarUsuario(correo, contrasenia);
      delete usuarioInsertado.contrasenia;
      console.log(usuarioInsertado);
      res.status(200).json({"msg":"Usuario creado"});
    } 
    catch(ex)
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
)

router.post(
  '/iniciarSesion',
  async (req, res) => {
    try 
    {
      const {correo, contrasenia} = req.body;
      let usuario = await obtenerPorCorreo(correo);
      if(usuario)
      {
        let validarContrasenia = await compararContrasenias(contrasenia, usuario.contrasenia);
        if (validarContrasenia) 
        {
          delete usuario.contrasenia;
          delete usuario.contraseniasAntiguas;
          const {correo, roles, _id} = usuario;
          let payload = 
          {
            jwt: jwt.sign({ correo, roles, _id }, process.env.JWT_SECRET, {expiresIn:'240m'}),
            usuario: usuario
          }
          res.status(200).json(payload);
        }
        else 
        {
          console.log(`Usuario ${correo} no coincide contraseña`);
          res.status(400).json({ "msg": "Credenciales no Válidas" })
        }
      } 
      else 
      {
        console.log(`Usuario ${correo} no encontrado en DB`);
        res.status(400).json({"msg":"Credenciales no Válidas"})
      }
    } 
    catch(ex)
    {
      res.status(500).json({"msg":"Error"});
    }
  }
);

module.exports = router;
