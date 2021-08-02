import appReducer from './reducers/app';
import secReducer from './reducers/sec';
import signinReducer from './reducers/signin'
import notaReducer from './reducers/notas';
import dashboardReducer from './reducers/dashboard';
import addNotaReducer from './reducers/addNota';

 const mainReducer = (state= {}, action={})=>{
  const { app, sec, signin, nota, dashboard, addNota} = state;
  return {
    //list all reducers of app
    sec: secReducer(sec, action),
    app: appReducer(app, action),
    nota: notaReducer(nota, action),
    dashboard: dashboardReducer(dashboard, action),
    signin: signinReducer(signin, action),
    addNota: addNotaReducer(addNota, action)
  }
}

export default mainReducer;
