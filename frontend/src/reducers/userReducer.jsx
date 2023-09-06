import{
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAIL,
  FORGETPASSWORD_REQUEST,
  FORGETPASSWORD_SUCCESS,
  FORGETPASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstants'
export const userReducer = (state = { user: {}}, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
          case REGISTER_REQUEST:
            case LOAD_USER_REQUEST:
          return {
            loading: true,
            isAuthentication:false,
          };
        case LOGIN_SUCCESS:
          case REGISTER_SUCCESS:
            case   LOAD_USER_SUCCESS:
          return {
            loading: false,
            isAuthentication:true,
            user:action.payload
          };
          case LOGOUT_USER_SUCCESS:
            return {
              loading: false,
              isAuthentication:true,
              user:null
            }
        case LOGIN_FAIL:
          case REGISTER_FAIL:
       
          return {
            ...state,
            loading: false,
              isAuthentication:false,
              user:null,
              error: action.payload,
          };
          case LOGOUT_USER_FAIL:
            return {
              ...state,
              loading: false,
            }
          case LOAD_USER_FAIL:
          return {
            loading: false,
              isAuthentication:false,
              user:null,
              error: action.payload,
          };
         
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
}

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGETPASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return{
        ...state,
        loading: true,
        error: null,
      }
      case FORGETPASSWORD_SUCCESS:
       
        return {
          ...state,
          loading: false,
          message: action.payload,
        }
        case RESET_PASSWORD_SUCCESS:
          return {
            ...state,
            loading: false,
            sucess: action.payload,
          }
        case FORGETPASSWORD_FAIL:
          case RESET_PASSWORD_FAIL:
          return{
            ...state,
            loading:false,
            error:action.payload,
           }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
  }
