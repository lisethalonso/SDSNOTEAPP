import { MdRemoveRedEye, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import Page from '../../shared/Page/Page';
import {useEffect, useRef} from 'react';
import {privateaxios} from '../../../store/axios';
import { useSession } from '../../../hooks/Session';
import { NOTA_FETCHING, NOTA_LOAD, NOTA_SETCURRENT } from '../../../store/reducers/notas';
import {Redirect, Link} from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';

import './Notas.css';

const Notas = () => {

  const [{ nota, sec }, dispatch] = useSession();
  const { pagina, cantidad, notas, fetching, tieneMas, redireccionar, scrollto} = nota;

  const cargarMasNotas = async (paginaCargar) => {
    if(!fetching && tieneMas){
      try 
      {
        const paginaIndex = pagina + 1;
        dispatch({ type: NOTA_FETCHING });
        let {data} = await privateaxios.get(`/api/notas/obtenerNotasUsuario/${paginaIndex}/${cantidad}/${sec.user.usuario._id}`);
        console.log(data);
        dispatch({ type: NOTA_LOAD, payload: data });
      } 
      catch (ex) 
      {
        console.log(ex);
      }
    }
  }

  const redirect = (_id) => {
    const scrollToY = scrollParentRef.current.scrollTop;
    dispatch({ type: NOTA_SETCURRENT, payload: { _id: _id, scrollToY: scrollToY}});
  }
  const scrollParentRef = useRef();


  const eliminarElemento = async (_id) => {
    try
    {
      console.log(_id);
      let {data} = await privateaxios.delete(`/api/notas/eliminar/${_id}`);
      console.log(data);
      window.location.reload();
    }
    catch(ex)
    {
      //dispatch del error
    }
   
  }

  useEffect(()=>{
    scrollParentRef.current.scrollTo(0, scrollto);
  }, [notas]);
  if (redireccionar) 
  {
    return (<Redirect to="/miNota"></Redirect>);
  }

  const listadoNotas = notas.map((o,i)=>{
    return (
      <li key={o._id + i} className="card">
        <span className="viewIcon" onClick={()=>redirect(o._id)}><MdRemoveRedEye/></span>
        <span className="deleteIcon" onClick={()=>eliminarElemento(o._id)}><MdDelete/></span>
        <h2>Titulo</h2>
        <p>{o.titulo}</p>
        <h2>Descripción</h2>
        <p>{o.descripcion}</p>
        <h2>Palabras Clave</h2>
        <p>{o.palabrasClave}</p>
        <h2>Fecha de Creación</h2> 
        <p>{o.fechaCreacion}</p>
      </li>
    );
  });
 
  return(
    <Page showHeader title="Mis Notas">
      <Link to="/addNota" className="addBtn"><MdAddCircleOutline/></Link>
      <section className="scrollerParent" ref={scrollParentRef}>
        <InfiniteScroll
          hasMore={tieneMas}
          getScrollParent={()=>scrollParentRef.current}
          loader={(<li className="listItem" key="loaderkeyid">Loading...</li>)}
          loadMore={cargarMasNotas}
          element="section"
          useWindow={false}
        >
          <ul className="cards">
            {listadoNotas}
          </ul>
        </InfiniteScroll>
      </section>
    </Page>
  )
}

export default Notas;