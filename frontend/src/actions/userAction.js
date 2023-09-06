import{
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    FORGETPASSWORD_REQUEST,
    FORGETPASSWORD_SUCCESS,
    FORGETPASSWORD_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    CLEAR_ERRORS,
} from '../constants/userConstants'
import axios from 'axios';
export const login = (email, password) => async (dispatch) => {
    try {
      dispatch({ type:LOGIN_REQUEST });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      const { data } = await axios.post(
        `/api/v1/login`,
        { email, password },
        config
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  export const register = (userData) => async (dispatch) => {
    try {
      dispatch({ type: REGISTER_REQUEST });

      const config = { headers: { "Content-Type": "multipart/form-data" } };
  
      const { data } = await axios.post(`/api/v1//password/forgot`, userData, config);
  
      dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  //me
  export const loadUser = () => async (dispatch) => {
    try {
      dispatch({ type:LOGIN_REQUEST });
  
     
  
      const { data } = await axios.get(
        `/api/v1/me`
      
      );
  
      dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  //logout
  export const logout = () => async (dispatch) => {
    try {
  const { data } = await axios.get(
        `/api/v1/logout`
    );
  
      dispatch({ type: LOGIN_SUCCESS});
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
    }
  };
  export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  };
  //forgetPassword
  export const forgetPassword = (email) => async (dispatch) => {
    try {
      
      dispatch({ type: FORGETPASSWORD_REQUEST});

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(`/api/v1/password/forgot`, email, config);
  
      dispatch({ type: FORGETPASSWORD_SUCCESS, payload: data.message});
    } catch (error) {
      dispatch({
        type: FORGETPASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };
  //reset password
  export const resetPassword = (token,passwords) => async (dispatch) => {
    try {
         dispatch({ type: RESET_PASSWORD_REQUEST});

      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config);
  
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.sucess});
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: error.response.data.message,
      });
    }
  };