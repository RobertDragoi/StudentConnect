import { useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import UserContext from '../state/UserState/userContext';
import PostContext from '../state/PostState/postContext';
import { useMutation } from '@tanstack/react-query';

const useUser = () => {
  // eslint-disable-next-line no-unused-vars
  const [searchedParams, setSearchParams] = useSearchParams();
  const { updateUser, getUser } = useContext(UserContext);
  const { getPosts } = useContext(PostContext);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [dataEdit, setDataEdit] = useState(false);
  const [skillsEdit, setSkillsEdit] = useState(false);

  const modifyMutation = useMutation({
    mutationFn: async () => await updateUser(updatedUser),
  });

  const onChange = (e) => {
    let aux = updatedUser;
    Object.keys(aux).forEach((key) => {
      if (key === e.target.name) {
        aux[key] = e.target.value;
      }
      if (key === 'profilePicture') {
        aux[key] = (e.target.files && e.target.files[0]) || aux[key];
      }
      Object.keys(aux[key]).forEach((key2) => {
        if (key2 === e.target.name) {
          aux[key][key2] = e.target.value;
        }
      });
    });
    setUpdatedUser(aux);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    modifyMutation.mutate();
    setDataEdit(false);
  };

  return {
    updateUser,
    getUser,
    getPosts,
    isCurrentUser:
      searchedParams.get('isCurrentUser') === 'true' ? true : false,
    updatedUser,
    setUpdatedUser,
    dataEdit,
    setDataEdit,
    skillsEdit,
    setSkillsEdit,
    onChange,
    onSubmit,
  };
};
export default useUser;
