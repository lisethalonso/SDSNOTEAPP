import { MdRemoveRedEye, MdAddCircleOutline} from 'react-icons/md';

import Page from '../../shared/Page/Page';
import {useEffect, useRef} from 'react';
import {privateaxios} from '../../../store/axios';
import { useSession } from '../../../hooks/Session';
import { NOTA_FETCHING, NOTA_LOAD, NOTA_SETCURRENT } from '../../../store/reducers/notas';
import {Redirect, Link} from 'react-router-dom';

import InfiniteScroll from 'react-infinite-scroller';

import './Notas.css';

const Notas = ()=>{
  /*
  pagina: 0,
  paginas: 0,
  cantidad: 10,
  error: "",
  notas: [],
  filtro: {},
  fetching: false,
  tieneMas: true,
  idActual: null,
  redireccionar:false,
  notaActual: null,
  scrollto:0,
  */

  const [{ nota, sec }, dispatch] = useSession();
  const { pagina, cantidad, notas, fetching, tieneMas, redireccionar, scrollto} = nota;

  const cargarMasNotas = async (paginaCargar) => {
    if(!fetching && tieneMas){
      try 
      {
        console.log(pagina, paginaCargar);
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

  const onClickHandler = (_id) => 
  {
    const scrollToY = scrollParentRef.current.scrollTop;
    dispatch({ type: NOTA_SETCURRENT, payload: { _id: _id, scrollToY: scrollToY}});
  }
  const scrollParentRef = useRef();

  useEffect(()=>{
    scrollParentRef.current.scrollTo(0, scrollto);
  }, []);
  if (redireccionar) 
  {
    return (<Redirect to="/miNota"></Redirect>);
  }

  const listadoNotas = notas.map((o,i)=>{
    return (
      <li key={o._id + i} className="listItem">
        <span className="listDetail">
          <span>{o.titulo}</span>
          <span>{o.descripcion}</span>
          <span>{o.palabrasClave}</span>
          <span>{o.fechaCreacion}</span>
        </span>
        <span onClick={()=>onClickHandler(o._id)}><MdRemoveRedEye/></span>
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
          <ul className="listHolder">
            {listadoNotas}
          </ul>
        </InfiniteScroll>
      </section>
    </Page>
  )
}

export default Notas;