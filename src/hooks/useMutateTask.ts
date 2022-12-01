import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { resetEditedTask, toggleCsrfState } from '../slices/appSlices';
import { Task } from '../types/types';

export const useMutateTask = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const createTaskMutation = useMutation(
    (task: Omit<Task, 'id'>) =>
      axios.post<Task>(`${process.env.REACT_APP_API_URL}/todo`, task, {
        withCredentials: true,
      }),
    {
      onSuccess: (res) => {
        const previousTodos = queryClient.getQueryData<Task[]>('tasks');
        if (previousTodos) {
          queryClient.setQueryData('tasks', [...previousTodos, res.data]);
        }
        dispatch(resetEditedTask());
      },
      onError: (err: any) => {
        alert(`${err.response.data.detail}\n${err.message}`);
        if (
          err.response.data.detail === 'The JWT has expired' ||
          err.response.data.detail === 'The CSRF token has expired.'
        ) {
          dispatch(toggleCsrfState());
          dispatch(resetEditedTask());
          navigate('/');
        }
      },
    }
  );

  return;
};
