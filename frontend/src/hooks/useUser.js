// Hook meant to be used to retrieve user based on react-router-dom params
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../state/UserState/userContext';
import userService from '../services/users';

export default function useUser() {
  const { id } = useParams();
  const { user: authUser, update, loading } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      console.log('Fetching user for ' + user?.email);
      try {
        const response = await userService.getUser(id);
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (e) {
        setUser(null);
      }
    };
    setUser(null);
    fetchUser();
  }, [id, authUser]);

  // set state if edit is possible
  useEffect(() => {
    if (authUser && user && authUser?.id === user?.id) {
      setIsCurrentUser(true);
    }
  }, [authUser, user]);

  return {
    update,
    loading,
    user,
    isCurrentUser,
    updatedUser,
    setUpdatedUser,
    edit,
    setEdit,
  };
}
