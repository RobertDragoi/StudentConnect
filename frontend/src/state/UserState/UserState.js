import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import UserContext from './userContext';
import UserReducer from './userReducer';
import { useHistory } from 'react-router-dom';
import authService from '../../services/auth';

import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  USER_LOADED,
  LOGOUT,
} from '../../types';

const UserState = (props) => {
  let history = useHistory();

  const initialState = {
    token: localStorage.token,
    isAuthenticated: false,
    user: null,
    error: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  useEffect(() => {
    if (localStorage.token) {
      authService.updateToken(localStorage.token);
      load();
    }
  }, []);

  const register = async (formData) => {
    try {
      const token = await authService.register(formData);
      dispatch({ type: REGISTER_SUCCES, payload: token });
      load();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
    }
  };

  const login = async (formData) => {
    try {
      const token = await authService.login(formData);
      dispatch({ type: LOGIN_SUCCES, payload: token });
      load();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: LOGOUT });
    history.push('/');
  };

  const update = async (formData) => {
    try {
      const updatedUser = await authService.update(formData);
      dispatch({ type: USER_LOADED, payload: updatedUser });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };
  const load = async () => {
    try {
      dispatch({ type: LOAD_USER });
      const loadedUser = await authService.load();
      dispatch({ type: USER_LOADED, payload: loadedUser });
    } catch (error) {
      console.log(error);
      logout();
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        register,
        login,
        logout,
        update,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;

UserState.propTypes = {
  children: PropTypes.array.isRequired,
};
