const express = require('express');
const router = express.Router();
const {
  obtenerPorId,
  eliminarPorId,
  agregarPalabrasClave,
  agregarPalabraClave,
  agregarNota,
  obtenerNotasUsuario,
  obtenerNotasUsuarioPorPagina,
  modificarNota
} = require('./notas.model');

router.get(
  "/obtenerNotasUsuario/:id",
  async (req, res) => {
    try 
    {
      let {id} = req.params;
      let notas = await obtenerNotasUsuario(id);
      res.status(200).json({notas});
      console.log(req.user);
    } 
    catch (ex) 
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

/*router.get(
  "/obtenerNotasUsuario/:pagina/:cantidad/:id",
  async (req, res) => {
    try 
    {
      let {pagina, cantidad, id} = req.params;
      pagina = parseInt(pagina);
      cantidad = parseInt(cantidad);
      let resultado = await obtenerNotasUsuarioPorPagina(pagina, cantidad, id);
      res.status(200).json({...resultado, pagina, cantidad});
      console.log(req.user);
    } 
    catch (ex) 
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);*/

router.get(
  "/porId/:id",
  async (req, res) => {
    try
    {
      let {id} = req.params;
      let fila = await obtenerPorId(id);
      res.status(200).json(fila);
    }
    catch(ex)
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.post(
  "/agregarNota",
  async (req, res)=>{
    try
    {
      let {titulo, descripcion, palabrasClave, usuario} = req.body;
      let documentoInsertado = await agregarNota(titulo, descripcion, palabrasClave, usuario);
      res.status(200).json(documentoInsertado);
    }
    catch(ex)
    {
      console.log(ex);
      res.status(500).json({"msg":"Error"});
    }
  }
);

router.put(
  "/agregarPalabraClave/:id",
  async (req, res) => {
    try
    {
      const {id} = req.params;
      const {palabraClave} = req.body;
      let resultado = await agregarPalabraClave(id, palabraClave);
      res.status(200).json(resultado);
    }
    catch(ex)
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.put(
  "/agregarPalabrasClave/:id",
  async (req, res) => {
    try 
    {
      const { id } = req.params;
      const { palabrasClave } = req.body;
      let resultado = await agregarPalabrasClave(id, palabrasClave);
      res.status(200).json(resultado);
    } 
    catch (ex) 
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.delete(
  "/eliminar/:id",
  async (req, res) => {
    try 
    {
      const { id } = req.params;
      let resultado = await eliminarPorId(id);
      res.status(200).json(resultado);
    } 
    catch (ex) 
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);

router.update (
  "/actualizar/:id",
  async (req, res) => {
    try 
    {
      const { id ,titulo, descripcion, palabraClave } = req.params;
      let resultado = await actualizarPorId(id ,titulo, descripcion, palabraClave);
      res.status(200).json(resultado);
    } 
    catch (ex) 
    {
      res.status(500).json({ "msg": "Error" });
    }
  }
);


module.exports = router;