import Page from '../../shared/Page/Page';
import Field from '../../shared/DataField/DataField';
import Button from '../../shared/Buttons/Button';
import { useState } from 'react';
import { useSession } from '../../../hooks/Session';
import { useHistory } from 'react-router-dom';
import { ADD_NOTA_REGISTRADO } from '../../../store/reducers/addNota';
import { privateaxios } from '../../../store/axios';

import './AddSnippet.css';

const AddNota = ()=> {
  const [titulo, setTitulo] = useState();
  const [descripcion, setDescripcion] = useState();
  const [palabrasClave, setPalabrasClave] = useState();
  const routeHistory = useHistory();
  let { from } = { from : {pathname:"/misNotas"}};
  const [{ addNota, sec }, dispatch] = useSession();
  let user = sec.user;

  const onClickHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    try{
      const { data } = await privateaxios.post("/api/notas/agregarNota", 
      {titulo: titulo, descripcion: descripcion, palabrasClave: palabrasClave, usuario: user.usuario._id});
      dispatch({type:ADD_NOTA_REGISTRADO, payload:data});
      routeHistory.replace(from);
    } 
    catch(ex)
    {
      //Dispacth del error
    }
  }
  
  return (
    <Page showHeader title="Nuevo">
      <section>
        <Field
          name="titulo"
          id="titulo"
          placeholder="Titulo nota"
          type="text"
          labelText="Titulo"
          value={titulo}
          onChange={(e)=>{setTitulo(e.target.value)}}
        >
        </Field>
        <Field
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion nota"
          type="textarea"
          labelText="Descripcion"
          value={descripcion}
          onChange={(e)=>setDescripcion(e.target.value)}
          rows="10"
          style={{minHeight:"40vh"}}
        >
        </Field>
        <Field
          name="palabrasClave"
          id="palabrasClave"
          placeholder="Etiquetas"
          type="text"
          labelText="Etiquetas"
          value={palabrasClave}
          onChange={(e)=>{setPalabrasClave(e.target.value)}}
        >
        </Field>
      </section>
      <section style={{padding:"1rem"}}>
          <Button onClick={onClickHandler}>Agregar Nota</Button>
        </section>
    </Page>
    );
}

export default AddNota;