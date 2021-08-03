let notasVacio = {
  error: "",
  notas: [],
  filtro: {},
  fetching: false,
  idActual: null,
  redireccionar:false,
  redireccionarEditar:false,
  notaActual: null
}

export const NOTA_FETCHING = "NOTA_FETCHING";
export const NOTA_LOAD = "NOTA_LOAD";
export const NOTA_RESET = "NOTA_FETCHING";
export const NOTA_ERROR = "NOTA_ERROR";
export const NOTA_SETCURRENT = "NOTA_SETCURRENT";
export const NOTA_SET_EDIT = "NOTA_SET_EDIT";
export const NOTA_CURRENT_LOAD = "NOTA_CURRENT_LOAD";


const notaReducer = (state = notasVacio, action = {}) => {
  switch(action.type)
  {
    case NOTA_FETCHING:
      return {
        ...state,
        fetching:true
      }   
    case NOTA_LOAD:
      console.log(action.payload);
      //const nuevasNotas = [...state.notas, ...action.payload.notas];
      //console.log({numeroFilas, filas, cantidad, paginas, pagina});
      return {
        ...state,
        fetching:false,
        error: "",
        notas: action.payload.notas
      }
    case NOTA_RESET:
      return notasVacio;
    case NOTA_ERROR:
      const {error} = action.payload;
      return {
        ...state,
        error : error
      }
    case NOTA_SETCURRENT:
      return {
        ...state,
        idActual: action.payload._id,
        redireccionar: true,
        redireccionarEditar: false
      }
    case NOTA_SET_EDIT:
      return {
        ...state,
        idActual: action.payload._id,
        redireccionarEditar: true,
      }
    case NOTA_CURRENT_LOAD:
      return {
        ...state,
        notaActual: action.payload,
        redireccionar: false,
        redireccionarEditar: false
      }
    default:
      return state;
  }
}

export default notaReducer;