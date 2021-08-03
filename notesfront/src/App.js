import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


import {SessionProvider, useSession} from './hooks/Session';
import mainReducer from "./store/";

import PrivateRoute from './components/shared/PrivateRoute';
import Menu from './components/shared/Menu/';
/* Public Pages */

import SplashScreen from './components/public/SplashScreen/';
import Home from './components/public/Home';
import IniciarSesion from './components/public/IniciarSesion';
import Registate from './components/public/Registrate';
/* Private Pages */
import MisNotas from './components/private/Notas';
import MiNota from './components/private/MiNota';
import AddNota from './components/private/AddNota';
import Perfil from './components/private/Perfil';

import './App.css';

function App() {
  let appSession = mainReducer();
  return (
    <SessionProvider initialState={appSession} reducer={mainReducer}>
    <SplashScreen>
        <Router>
          <div className="App">
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route exact path="/iniciarSesion" component={IniciarSesion}></Route>
                  <Route exact path="/registrate" component={Registate}></Route>
                  <PrivateRoute exact path="/misNotas" component={MisNotas}></PrivateRoute>
                  <PrivateRoute exact path="/miNota" component={MiNota}></PrivateRoute>
                  <PrivateRoute exact path="/addNota" component={AddNota}></PrivateRoute>
                  <PrivateRoute exact path="/perfil" component={Perfil}></PrivateRoute>
              </Switch>
              <Menu login={false}></Menu>
          </div>
        </Router>
      </SplashScreen>
    </SessionProvider>
  );
}

export default App;
