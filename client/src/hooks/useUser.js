// Hook meant to be used to retrieve user based on react-router-dom params
import { useParams, useSearchParams } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../state/UserState/userContext';
import usersService from '../services/users';

export default function useUser() {
  const { id } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [searchedParams, setSearchParams] = useSearchParams();

  const {
    user: authUser,
    updateUser,
    loading: authLoading,
  } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [dataEdit, setDataEdit] = useState(false);
  const [skillsEdit, setSkillsEdit] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (searchedParams.get('isCurrentUser') === 'false') {
          setLoading(true);
          const response = await usersService.getUser(id);
          setUser(response.data);
          setUpdatedUser(response.data);
          setLoading(false);
          console.log('Fetching user for ' + user?.email);
        } else {
          setIsCurrentUser(true);
          setUser(authUser);
          setUpdatedUser(authUser);
          console.log('Fetching authenticated user');
        }
      } catch (e) {
        setUser(null);
      }
    };
    setUser(null);
    fetchUser();
  }, [id, authUser]);

  return {
    updateUser,
    loading: isCurrentUser ? authLoading : loading,
    user,
    isCurrentUser,
    updatedUser,
    setUpdatedUser,
    dataEdit,
    setDataEdit,
    skillsEdit,
    setSkillsEdit,
  };
}
