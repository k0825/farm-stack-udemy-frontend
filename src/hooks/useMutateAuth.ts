import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { resetEditedTask, toggleCsrfState } from '../slices/appSlices';
import { User } from '../types/types';

export const useMutateAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {
        withCredentials: true,
      }),
    {
      onSuccess: () => {
        navigate('/todo');
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF Token has expired.') {
          dispatch(toggleCsrfState());
        }
      },
    }
  );

  const registerMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/register`, user),
    {
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF Token has expired.') {
          dispatch(toggleCsrfState());
        }
      },
    }
  );

  const logoutMutation = useMutation(
    async () =>
      await axios.post(
        `${process.env.REACT_APP_API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      ),
    {
      onSuccess: () => {
        navigate('/');
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (err.response.data.detail === 'The CSRF Token has expired.') {
          dispatch(toggleCsrfState());
          dispatch(resetEditedTask());
          navigate('/');
        }
      },
    }
  );

  return { loginMutation, registerMutation, logoutMutation };
};
