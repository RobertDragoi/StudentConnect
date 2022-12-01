// Hook meant to be used to retrieve user based on react-router-dom params
import { useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../state/UserState/userContext';
import PostContext from '../state/PostState/postContext';
const useUser = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchedParams, setSearchParams] = useSearchParams();

  const { updateUser, getUser, loading } = useContext(UserContext);
  const { getPosts } = useContext(PostContext);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [dataEdit, setDataEdit] = useState(false);
  const [skillsEdit, setSkillsEdit] = useState(false);

  console.log('useUser');
  return {
    updateUser,
    getUser,
    getPosts,
    loading,
    isCurrentUser:
      searchedParams.get('isCurrentUser') === 'true' ? true : false,
    updatedUser,
    setUpdatedUser,
    dataEdit,
    setDataEdit,
    skillsEdit,
    setSkillsEdit,
  };
};
export default useUser;
