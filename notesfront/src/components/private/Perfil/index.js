import Page from '../../shared/Page/Page';
import Button from '../../shared/Buttons/Button';
import { useHistory } from 'react-router-dom';
import { useSession } from '../../../hooks/Session';
import { SEC_LOGOUT } from '../../../store/reducers/sec';
import { RiUser3Fill} from 'react-icons/ri';

import './Perfil.css';

const Profile = () => {
  let { from } = { from : {pathname:"/"}};
  const routeHistory = useHistory();
  const [{ sec }, dispatch] = useSession();

  const onClickHandler = (e)=>{
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: SEC_LOGOUT });
    localStorage.clear();
    routeHistory.replace(from);
  };

  return (
    <Page showHeader title="Perfil">
      <div className="userContainer">
      <span className="userIcon"><RiUser3Fill/></span>
      <h2 className="userCorreo">Correo: {sec.user.usuario.correo}</h2>
          <Button onClick={onClickHandler}>Cerrar Sesión</Button>
      </div>
    </Page>
  )
}

export default Profile;