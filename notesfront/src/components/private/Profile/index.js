import Page from '../../shared/Page/Page';
import Button from '../../shared/Buttons/Button';
import { useHistory } from 'react-router-dom';
import { useSession } from '../../../hooks/Session';
import { SEC_LOGOUT } from '../../../store/reducers/sec';


const Profile = () => {
  let { from } = { from : {pathname:"/"}};
  const routeHistory = useHistory();
  const [{ sec }, dispatch] = useSession();

  const onClickHandler = async (e)=>{
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: SEC_LOGOUT });
    localStorage.clear();
    routeHistory.replace(from);
  };

  return (
    <Page showHeader title="Profile">
      <h2>Profile</h2>
      <section style={{padding:"1rem"}}>
          <Button onClick={onClickHandler}>Cerrar Sesión</Button>
        </section>
    </Page>
  )
}

export default Profile;