import { MdRemoveRedEye, MdAddCircleOutline, MdDelete} from 'react-icons/md';

import Page from '../../shared/Page/Page';
import {useEffect, useRef, useState} from 'react';
import {privateaxios} from '../../../store/axios';
import { useSession } from '../../../hooks/Session';
import { NOTA_FETCHING, NOTA_LOAD, NOTA_SETCURRENT } from '../../../store/reducers/notas';
import {Redirect, Link} from 'react-router-dom';

import './Notas.css';

const Notas = () => {

  const [{ nota, sec }, dispatch] = useSession();

  const cargarMasNotas = async () => {
    try 
      {
        dispatch({ type: NOTA_FETCHING });
        let {data} = await privateaxios.get(`/api/notas/obtenerNotasUsuario/${sec.user.usuario._id}`);
        //console.log(data);
        dispatch({ type: NOTA_LOAD, payload: data });
      } 
      catch (ex) 
      {
        console.log(ex);
      }
  }
  console.log(nota.notas.length);

  useEffect(()=>{
    cargarMasNotas();
  }, []);

  const redirect = (_id) => 
  {
    dispatch({ type: NOTA_SETCURRENT, payload: { _id: _id}});
  }

  const eliminarNota = async (_id) => 
  {
    try 
    {
      await privateaxios.delete(`/api/notas/eliminar/${_id}`);
      cargarMasNotas();
    } 
    catch (ex) 
    {
      console.log(ex);
    }
  }

  if (nota.redireccionar) 
  {
    return (<Redirect to="/miNota"></Redirect>);
  }

  const formatearFecha = (fecha)=>{
    let nuevaFecha = new Date(fecha);
    nuevaFecha = nuevaFecha.toLocaleDateString();
    return nuevaFecha;
  }

  const listadoNotas = nota.notas.map((o,i)=>{
    return (
      <li key={o._id + i} className="card">
        <span className="viewIcon" onClick={()=>redirect(o._id)}><MdRemoveRedEye/></span>
        <span className="deleteIcon" onClick={()=>eliminarNota(o._id)}><MdDelete/></span>
        <h2>Titulo</h2>
        <p>{o.titulo}</p>
        <h2>Descripción</h2>
        <p>{o.descripcion}</p>
        <h2>Palabras Clave</h2>
        <p>{o.palabrasClave}</p>
        <h2>Fecha de Creación</h2> 
        <p>{o.fechaCreacion=formatearFecha(o.fechaCreacion)}</p>
      </li>
    );
  });

  return(
    <Page showHeader title="Mis Notas">
      <Link to="/addNota" className="addBtn"><MdAddCircleOutline/></Link>
      <section>
        <ul className="cards"> 
          {listadoNotas} 
        </ul>
      </section>
    </Page>
  )
}

export default Notas;