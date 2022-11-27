import { FormEvent, useState } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useMutateAuth } from './useMutateAuth';

export const useProcessAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ email: '', password: '' });
  const [isLogin, setIsLogin] = useState(true);

  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth();

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: form.email,
        password: form.password,
      });
    } else {
      await registerMutation
        .mutateAsync({
          email: form.email,
          password: form.password,
        })
        .then(() => {
          loginMutation.mutate({
            email: form.email,
            password: form.password,
          });
        })
        .catch(() => {
          setForm({
            email: '',
            password: '',
          });
        });
    }

    const logout = async () => {
      await logoutMutation.mutateAsync();
      queryClient.removeQueries('tasks');
      queryClient.removeQueries('user');
      queryClient.removeQueries('single');
      navigate('/');
    };
    return { form, setForm, isLogin, setIsLogin, processAuth, logout };
  };
};
