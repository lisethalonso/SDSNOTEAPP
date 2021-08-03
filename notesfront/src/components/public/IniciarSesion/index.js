import DataField from  '../../shared/DataField/DataField';
import Button from '../../shared/Buttons/Button';
import Page from '../../shared/Page/Page';
import {useSession} from '../../../hooks/Session';
import {useState} from 'react';
import {SEC_LOGIN, SEC_FETCHING} from '../../../store/reducers/sec';
import { publicaxios } from '../../../store/axios';
import { useHistory , useLocation} from 'react-router-dom';

const IniciarSesion = () => {

  const [correo, setCorreo] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [{ sec }, dispatch] = useSession();
  const location = useLocation();
  const routeHistory = useHistory();
  let { from } = location.state || { from : {pathname:"/"}};

  const onClickHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: SEC_FETCHING });
    try
    {
      const { data } = await publicaxios.post(
        "/api/seguridad/iniciarSesion",
        {correo:correo, contrasenia:contrasenia}
      );
      dispatch({ type: SEC_LOGIN, payload: data });
      routeHistory.replace(from);
    } 
    catch(ex)
    {
      //Dispacth del error
    }
  };
  return (
    <Page showHeader={true} title="Iniciar Sesión">
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
          onChange={(e)=>{setContrasenia(e.target.value)}}>
        </DataField>

        <Button onClick={onClickHandler}>Iniciar Sesión</Button>

    </Page>
  )
}

export default IniciarSesion;
