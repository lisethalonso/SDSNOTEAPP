let emptyDashboard = {
    error: "",
    indicador1: null,
    indicador2: [],
    indicador3: null,
    fetching: false,
    redirect:false,
}

export const DASHBOARD_FETCHING = "DASHBOARD_FETCHING";
export const DASHBOARD_LOAD_SNIPPETS = "DASHBOARD_LOAD_SNIPPETS";
export const DASHBOARD_LOAD_TOP_KEYWORDS = "DASHBOARD_LOAD_TOP_KEYWORDS";
export const DASHBOARD_LOAD_TOTAL_SALES = "DASHBOARD_LOAD_TOTAL_SALES"

const dashboardReducer = (state = emptyDashboard, action = {}) => {
    switch(action.type){
      case DASHBOARD_FETCHING:
        return {
          ...state,
          fetching:true
        }
      case DASHBOARD_LOAD_SNIPPETS:
        const frecuency = action.payload[0].frecuency;
        /*
        const object1 = {
          ...state,
          fetching:false,
          error: "",
          indicador1: frecuency
        }
        return object1;
        */
        return {
          ...state,
          fetching:false,
          error: "",
          indicador1: frecuency
        }

      case DASHBOARD_LOAD_TOP_KEYWORDS:
        const keywords = action.payload;
        /*
        const object2 = {
          ...state,
          fetching:false,
          error: "",
          indicador2: keywords
        }
        return object2;
        */
        return {
          ...state,
          fetching:false,
          error: "",
          indicador2: keywords
        }
      
      case DASHBOARD_LOAD_TOTAL_SALES:
        const sales = action.payload[0].conteo;
        /*
        const object3 = {
          ...state,
          fetching:false,
          error: "",
          indicador3: sales
        }
        return object3;
        */
        return {
          ...state,
          fetching:false,
          error: "",
          indicador3: sales
        }

      default:
        return state;
    }
  }

export default dashboardReducer;