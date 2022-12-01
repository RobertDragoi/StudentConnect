import { useContext, useState } from 'react';
import UserContext from '../state/UserState/userContext';
import PostContext from '../state/PostState/postContext';
const useHome = () => {
  const [type, setType] = useState('companies');
  const [render, setRender] = useState('');
  const { getPosts, search, filters } = useContext(PostContext);
  const { isAuthenticated } = useContext(UserContext);

  return {
    type,
    setType,
    render,
    setRender,
    getPosts,
    search,
    filters,
    isAuthenticated,
  };
};

export default useHome;
