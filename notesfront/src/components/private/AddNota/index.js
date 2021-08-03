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
  const routeHistory = useHistory();
  let { from } = { from : {pathname:"/misNotas"}};
  const [{ addNota, sec }, dispatch] = useSession();
  let user = sec.user;

  const [valoresFormulario, setValoresFormulario] = useState({
    titulo:"",
    descripcion: "",
    palabrasClave: "",
    usuario: user.usuario._id
  });

  const submitHandler = async (e) =>{
    e.preventDefault();
    e.stopPropagation();
    //console.log(valoresFormulario);
    try{
      const { data } = await privateaxios.post("/api/notas/agregarNota", valoresFormulario);
      dispatch({type:ADD_NOTA_REGISTRADO, payload:data});
      routeHistory.replace(from);
    } 
    catch(ex)
    {
      console.log(ex);
    }
  }

  const onChangeHandler =  (e)=>{
    const {name, value} = e.target;
    setValoresFormulario({...valoresFormulario, [name]: value})
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
          value={valoresFormulario.titulo}
          onChange={onChangeHandler}
        >
        </Field>
        <Field
          name="descripcion"
          id="descripcion"
          placeholder="Descripcion nota"
          type="textarea"
          labelText="Descripcion"
          value={valoresFormulario.descripcion}
          onChange={onChangeHandler}
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
          value={valoresFormulario.palabrasClave}
          onChange={onChangeHandler}
        >
        </Field>
      </section>
      <section style={{padding:"1rem"}}>
          <Button onClick={submitHandler}>Agregar Nota</Button>
        </section>
    </Page>
    );
}

export default AddNota;