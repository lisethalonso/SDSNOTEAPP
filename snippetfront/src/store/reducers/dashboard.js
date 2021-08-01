let emptyDashboard = {
    error: "",
    indicador1: [],
    indicador2: [],
    indicador3: [],
    fetching: false,
    redirect:false,
}

export const DASHBOARD_FETCHING = "DASHBOARD_FETCHING";
export const DASHBOARD_LOAD_SNIPPETS = "DASHBOARD_LOAD_SNIPPETS";
export const DASHBOARD_LOAD_TOP_KEYWORDS = "DASHBOARD_LOAD_TOP_KEYWORDS";

const dashboardReducer = (state = emptyDashboard, action = {}) => {
    switch(action.type){
      case DASHBOARD_FETCHING:
        return {
          ...state,
          fetching:true
        }
      case DASHBOARD_LOAD_SNIPPETS:
        const frecuency = action.payload[0].frecuency;
        //console.log(frecuency);
        return {
          ...state,
          fetching:false,
          error: "",
          indicador1: frecuency,
        }
        case DASHBOARD_LOAD_TOP_KEYWORDS:
        //const keywords = action.payload;
        //console.log(keywords);
        return {
          ...state,
          fetching:false,
          error: "",
          indicador2: "hola"//keywords,
        }
      default:
        return state;
    }
  }

export default dashboardReducer;