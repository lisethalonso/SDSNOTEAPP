const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectID;
const bcrypt = require("bcryptjs");
let db;
let seguridadColeccion;

//se ejecuta cuando se manda a require(este archivo)
(async function () {
  try 
  {
    if (!seguridadColeccion) 
    {
      db = await MongoDB.getDB();
      seguridadColeccion = db.collection("seguridad");
      if (process.env.ENSURE_INDEX == 1) 
      {
        // Vamos a asegurarnos de que exista el indice
      }
    }
  } 
  catch (ex) 
  {
    console.log(ex);
    process.exit(1);
  }
})();

module.exports.registrarUsuario = async (correo, contrasenia) => {
  try {
    let usuario = {
      correo:correo,
      contrasenia: await bcrypt.hash(contrasenia, 10),
      ultimoLogin: null,
      ultimaVezCambioContrasenia:null,
      expiracionContrasenia: new Date().getTime() + (30 * 24 * 60 * 60 * 1000),
      contraseniasAntiguas:[],
      roles:["publico"]
    }
    let resultado = await seguridadColeccion.insertOne(usuario);
    return resultado.ops[0];
  }
  catch (ex)
  {
    console.log(ex);
    throw(ex);
  }
}

module.exports.obtenerPorCorreo = async (correo) => {
  try 
  {
    const filtro = {correo:correo};
    let usuario = await seguridadColeccion.findOne(filtro);
    return usuario;
  }
  catch(ex)
  {
    console.log(ex);
    throw(ex);
  }
}

module.exports.compararContrasenias = async (contraseniaNormal, contraseniaEncriptada) => {
  try
  {
    return await bcrypt.compare(contraseniaNormal, contraseniaEncriptada);
  }
  catch(ex)
  {
    console.log(ex);
    throw(ex);
  }
}
