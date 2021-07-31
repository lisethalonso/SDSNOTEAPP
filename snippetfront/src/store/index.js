import appReducer from './reducers/app';
import secReducer from './reducers/sec';
import snippetReducer from './reducers/snippets';
import dashboardReducer from './reducers/dashboard';

 const mainReducer = (state= {}, action={})=>{
   const { app, sec, snippet, dashboard } = state;
  return {
    //list all reducers of app
    sec: secReducer(sec, action),
    app: appReducer(app, action),
    snippet: snippetReducer(snippet, action),
    dashboard: dashboardReducer(dashboard, action)
  }
}

export default mainReducer;
