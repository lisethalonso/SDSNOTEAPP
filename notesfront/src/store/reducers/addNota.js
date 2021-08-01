let emptyAddNota = {
    registrado: false,
    hasError: false,
    error:""
}

export const ADD_NOTA_REGISTRADO = "ADD_NOTA_REGISTRADO";
export const ADD_NOTA_ERROR = "ADD_NOTA_ERROR";

const addNotaReducer = (state = emptyAddNota, action = {}) => {
    switch (action.type) {
        case ADD_NOTA_REGISTRADO:
            return {    
                ...state,
                registrado: true,
                hasError: false,
                error:""
            };    
        case ADD_NOTA_ERROR:
            return {    
                ...state,
                registrado: false,
                hasError: true,
                error: action.payload
            };
        default:
            return state;
    }
}

export default addNotaReducer;