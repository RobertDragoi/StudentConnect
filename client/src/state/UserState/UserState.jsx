import React, { useReducer } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import UserContext from './userContext';
import UserReducer from './userReducer';
import authService from '../../services/auth';
import userService from '../../services/user';
import {
  REGISTER_SUCCES,
  REGISTER_FAIL,
  LOGIN_SUCCES,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  LOGOUT,
} from '../types';

const UserState = (props) => {
  let navigate = useNavigate();

  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
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
      await authService.register(formData);
      dispatch({ type: REGISTER_SUCCES });
      loadUser();
    } catch (error) {
      dispatch({ type: REGISTER_FAIL, payload: error.message });
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
    }
  };

  const login = async (formData) => {
    try {
      await authService.login(formData);
      dispatch({ type: LOGIN_SUCCES });
      loadUser();
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
      setTimeout(() => dispatch({ type: CLEAR_ERRORS }), 3000);
    }
  };

  const logout = async () => {
    await authService.logout();
    dispatch({ type: LOGOUT });
    navigate('/');
  };
  const getUser = async (id) => {
    try {
      const user = await userService.getUser(id);
      console.log(user);
      return user;
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.message });
    }
  };
  const getUsers = async () => {
    const users = await userService.getUsers();
    return users;
  };
  const updateUser = async (formData) => {
    try {
      const updatedUser = await userService.updateUser(formData);
      dispatch({ type: LOAD_USER, payload: updatedUser });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error.response.data.msg });
    }
  };

  const loadUser = async () => {
    try {
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
        getUser,
        getUsers,
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
