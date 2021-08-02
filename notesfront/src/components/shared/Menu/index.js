// A todo componente de react se agrega un objeto props
// login
import './menu.css';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {useSession} from '../../../hooks/Session';
const Menu = ()=>{
  let [ {sec}, ] = useSession();
  let {path, ...match} = useRouteMatch();
  console.log(path, match);
  if (!sec.isLogged){
    return (
      <ul className="Menu">
        <li><NavLink activeClassName="active" to='/iniciarSesion'>Iniciar Sesión</NavLink></li>
        <li><NavLink activeClassName="active" to='/registrate'>Regístrate</NavLink></li>
      </ul>
    );
  }else {
    return (
      <ul className="Menu">
        <li><NavLink to="/misNotas">Mis Notas</NavLink></li>
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><a>Upload</a></li>
      </ul>
    );
  }
  
}

export default Menu;