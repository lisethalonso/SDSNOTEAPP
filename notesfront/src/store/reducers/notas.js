let Nota = {
  pagina: 0,
  paginas: 0,
  cantidad: 10,
  error: "",
  notas: [],
  filtro: {},
  fetching: false,
  tieneMas: true,
  idActual: null,
  redireccionar:false,
  notaActual: null,
  scrollto:0,
}

export const NOTA_FETCHING = "NOTA_FETCHING";
export const NOTA_LOAD = "NOTA_LOAD";
export const NOTA_RESET = "NOTA_FETCHING";
export const NOTA_ERROR = "NOTA_ERROR";
export const NOTA_SETCURRENT = "NOTA_SETCURRENT";
export const NOTA_CURRENT_LOAD = "NOTA_CURRENT_LOAD";


const notaReducer = (state = Nota, action = {}) => {
  switch(action.type)
  {
    case NOTA_FETCHING:
      return {
        ...state,
        fetching:true
      }   
    case NOTA_LOAD:
      console.log(action.payload);
      const {numeroFilas, filas, pagina, cantidad} = action.payload;
      const paginas = Math.ceil(numeroFilas / cantidad);
      console.log({numeroFilas, filas, cantidad, paginas, pagina});
      const tieneMas = pagina <= paginas;
      const nuevasFilas = [...state.notas, ...filas];

      return {
        ...state,
        fetching:false,
        pagina: pagina,
        paginas: paginas,
        cantidad: cantidad,
        error: "",
        notas: nuevasFilas,
        tieneMas: tieneMas,
      }
    case NOTA_RESET:
      return Nota;
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
        scrollto:action.payload.scrollToY,
        redireccionar: true,
      }
    case NOTA_CURRENT_LOAD:
      return {
        ...state,
        notaActual: action.payload,
        redireccionar: false,
      }
    default:
      return state;
  }
}

export default notaReducer;