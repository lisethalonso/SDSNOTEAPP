let emptySignin = {
    isSignedIn: false,
    hasError: false,
    error:""
}

export const SIGN_SIGNIN = "SIGN_SIGNIN";
export const SIGN_ERROR = "SIGN_ERROR";

const signinReducer = (state = emptySignin, action = {}) => {
    switch (action.type) {
        case SIGN_SIGNIN:
            return {    
                ...state,
                isSignedIn: true,
                hasError: false,
                error: ""
            };    
        case SIGN_ERROR:
            return {    
                ...state,
                isSignedIn: false,
                hasError: true,
                error: action.payload
            };
        default:
            return state;
    }
}

export default signinReducer;