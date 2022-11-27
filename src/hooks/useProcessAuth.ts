import { FormEvent, useState } from 'react';
import { QueryClient, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useMutateAuth } from './useMutateAuth';

export const useProcessAuth = (): any => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth();

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: password,
      });
    } else {
      await registerMutation
        .mutateAsync({
          email: email,
          password: password,
        })
        .then(() => {
          loginMutation.mutate({
            email: email,
            password: password,
          });
        })
        .catch(() => {
          setEmail('');
          setPassword('');
        });
    }
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries('tasks');
    queryClient.removeQueries('user');
    queryClient.removeQueries('single');
    navigate('/');
  };
  return {
    email,
    setEmail,
    password,
    setPassword,
    isLogin,
    setIsLogin,
    processAuth,
    logout,
    loginMutation,
    registerMutation,
  };
};
