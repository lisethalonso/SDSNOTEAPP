const MongoDB = require('../../utilities/db');
const ObjectId = require('mongodb').ObjectId; //
let db;
let notasColeccion;

(async function(){
    try
    {
      if (!notasColeccion) 
      {
        db = await MongoDB.getDB();
        notasColeccion = db.collection("notas");
        if(process.env.ENSURE_INDEX == 1)
        {
          // Vamos a asegurarnos de que exista el indice
        }
      }
    }
    catch(ex)
    {
      console.log(ex);
      process.exit(1);
    }
})();

module.exports.obtenerNotasUsuario = async (id) => {
  try {
    let filtro = {usuario: id};
    let options = {
      projection: {titulo:1, descripcion:1, palabrasClave:1, fechaCreacion:1},
      sort:[["titulo", 1]]
    };

    let docsCursor = notasColeccion.find(filtro, options);
    let filas = await docsCursor.toArray()
    return filas;
  } 
  catch (ex) 
  {
    console.log(ex);
    throw (ex);
  }
}

module.exports.obtenerNotasUsuarioPorPagina = async (pagina, elementosPorPagina, id) => {
  try {
    let filtro = {usuario: id};
    let options = {
      skip: (pagina - 1) * elementosPorPagina,
      limit: elementosPorPagina,
      projection: {titulo:1, descripcion:1, palabrasClave:1, fechaCreacion:1},
      sort:[["titulo", 1]]
    };

    let docsCursor = notasColeccion.find(filtro, options);
    let numeroFilas = await docsCursor.count();
    let filas = await docsCursor.toArray()
    return {numeroFilas, filas};
  } 
  catch (ex) 
  {
    console.log(ex);
    throw (ex);
  }
}

module.exports.obtenerPorId = async (id) => {
  try 
  {
    const _id = new ObjectId(id);
    const filtro = {_id: _id};
    let fila = await notasColeccion.findOne(filtro);
    return fila;
  } 
  catch (ex) 
  {
    console.log(ex);
    throw(ex);
  }
}

module.exports.agregarNota = async (titulo, descripcion, palabrasClave, id) => {
  const fecha = new Date().getTime();
    try
    {
      let nuevaNota = 
      {
        titulo: titulo,
        descripcion: descripcion,
        palabrasClave: palabrasClave.split(","),
        fechaCreacion: fecha,
        usuario:id
      };

      let resultado = await notasColeccion.insertOne(nuevaNota);
      return resultado.ops;
    }
    catch(ex)
    {
      console.log(ex);
      throw(ex);
    }
}

module.exports.modificarNota = async (id, titulo, descripcion, palabrasClave) => {
  try
  {
    const _id = new ObjectId(id);
    let filtro = {_id:_id};

    const objetoActualizar = {
      "$set": 
      { 
        "titulo": titulo,
        "descripcion":descripcion,
        "palabrasClave":palabrasClave.split(",")
      } 
    };

    let resultado = await notasColeccion.updateOne(filtro, objetoActualizar);
    return resultado.ops;
  }
  catch(ex)
  {
    console.log(ex);
    throw(ex);
  }
}

module.exports.agregarPalabraClave = async (id, palabraClave) => {
  try 
  {
    const _id = new ObjectId(id);
    const filtro = {"_id": _id};
    const objetoActualizar = {"$push":{"palabrasClaves": palabraClave}};
    let resultado = await notasColeccion.updateOne(filtro, objetoActualizar);
    return resultado;
  } 
  catch(ex) 
  {
    console.log(ex);
    throw(ex);
  }
}

module.exports.agregarPalabrasClave = async (id, palabrasClave) => {
  try 
  {
    const _id = new ObjectId(id);
    const filtro = { "_id": _id };
    const objetoActualizar = { "$set": { "palabrasClave": palabrasClave.split(",") } };
    let resultado = await notasColeccion.updateOne(filtro, objetoActualizar);
    return resultado;
  } 
  catch (ex) 
  {
    console.log(ex);
    throw (ex);
  }
}

module.exports.eliminarPorId = async (id) => {
  try 
  {
    const _id = new ObjectId(id);
    const filtro = { _id: _id };
    let fila = await notasColeccion.deleteOne(filtro);
    return fila;
  } 
  catch (ex) 
  {
    console.log(ex);
    throw (ex);
  }
}