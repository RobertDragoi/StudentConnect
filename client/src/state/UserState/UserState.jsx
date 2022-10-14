import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import UserContext from './userContext';
import UserReducer from './userReducer';
import authService from '../../services/auth';
import usersService from '../../services/users';
import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  LOADING,
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

  const refreshToken = async () => {
    try {
      await authService.refreshToken();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  const register = async (formData) => {
    try {
      const token = await authService.register(formData);
      dispatch({ type: REGISTER_SUCCES, payload: token });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
    }
  };

  const login = async (formData) => {
    try {
      const token = await authService.login(formData);
      dispatch({ type: LOGIN_SUCCES, payload: token });
      loadUser();
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

  const updateUser = async (formData) => {
    try {
      const updatedUser = await usersService.updateUser(formData);
      dispatch({ type: LOAD_USER, payload: updatedUser });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  const loadUser = async () => {
    try {
      dispatch({ type: LOADING });
      const loadedUser = await authService.loadUser();
      dispatch({ type: LOAD_USER, payload: loadedUser });
    } catch (error) {
      logout();
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  return (
    <UserContext.Provider
      value={{
        ...state,
        refreshToken,
        register,
        login,
        logout,
        updateUser,
        loadUser,
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
