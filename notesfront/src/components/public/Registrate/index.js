import DataField from  '../../shared/DataField/DataField';
import Page from '../../shared/Page/Page';
import Button from '../../shared/Buttons/Button';
import {useState} from 'react';
import {useSession} from '../../../hooks/Session';
import { useHistory } from 'react-router-dom';
import { SIGN_SIGNIN } from '../../../store/reducers/signin';
import { publicaxios } from '../../../store/axios';

const Registrate = ()=>{
  const [correo, setCorreo] = useState();
  const  [contrasenia, setContrasenia] = useState();
  const [{ sec }, dispatch] = useSession();
  const routeHistory = useHistory();
  let { from } = { from : {pathname:"/iniciarSesion"}};

  const onClickHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    try
    {
      const { data } = await publicaxios.post(
        "/api/seguridad/registrarse",
        {correo:correo, contrasenia:contrasenia}
      );
      dispatch({ type: SIGN_SIGNIN, payload: data });
      routeHistory.replace(from);
    } catch(ex)
    {
      //Dispacth del error
    }
  };

  return (
    <Page showHeader title="Regístrate">
        <DataField
          labelText="Correo electrónico"
          type="email"
          placeholder="example123@gmail.com"
          value={correo}
          name="correo"
          id="correo"
          title="Correo electrónico"
          error=""
          onChange={(e)=>{setCorreo(e.target.value)}}>
        </DataField>
        <DataField
          labelText="Contraseña"
          type="password"
          placeholder="Ingrese su contraseña"
          value={contrasenia}
          name="contrasenia"
          id="contrasenia"
          title="Contraseña"
          error=""
          onChange={(e)=>{ setContrasenia(e.target.value)}}>
        </DataField>
        <Button onClick={onClickHandler}>Registrarse</Button>
    </Page>
  )
}

export default Registrate;
