import axios from 'axios';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { toggleCsrfState } from '../slices/appSlices';
import { User } from '../types/types';

export const useMutateAuth = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const loginMutation = useMutation(
    async (user: User) =>
      await axios.post(`${process.env.REACT_APP_API_URL}/login`, user {
        withCredentials: true,
      }),
      {
        onSuccess: () => {
            navigate("/todo")
        },
        onError: (err: any) => {
            alert(`${err.response.data.detail}\n${err.message}`)
            if (err.response.data.detail === 'The CSRF Token has expired.') {
                dispatch(toggleCsrfState())
            }
        }
      }
  );

  return {};
};
