// Hook meant to be used to retrieve user based on react-router-dom params
import { useParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../state/UserState/userContext';
import usersService from '../services/users';

export default function useUser() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { user: authUser, updateUser } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        if (authUser?.id !== id) {
          console.log('Fetching user for ' + user?.email);
          const response = await usersService.getUser(id);
          setUser(response.data);
          setUpdatedUser(response.data);
        } else {
          setIsCurrentUser(true);
          setUser(authUser);
          setUpdatedUser(authUser);
        }
        setLoading(false);
      } catch (e) {
        setUser(null);
      }
    };
    setUser(null);
    fetchUser();
  }, [id, authUser]);

  return {
    updateUser,
    loading,
    user,
    isCurrentUser,
    updatedUser,
    setUpdatedUser,
    edit,
    setEdit,
  };
}
