import { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useMutateAuth } from './useMutateAuth';

interface useProcessAuthType {
  login: (e: FormEvent<HTMLFormElement>) => void;
  register: (e: FormEvent<HTMLFormElement>) => void;
  logout: () => void;
  isLoadingLogin: boolean;
  isLoadingRegister: boolean;
}

export const useProcessAuth = (): useProcessAuthType => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth();

  const login = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail(e.currentTarget.email.value);
    setPassword(e.currentTarget.password.value);

    loginMutation.mutate({
      email: email,
      password: password,
    });
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmail(e.currentTarget.email.value);
    setPassword(e.currentTarget.password.value);

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
  };

  const logout = async () => {
    await logoutMutation.mutateAsync();
    queryClient.removeQueries('tasks');
    queryClient.removeQueries('user');
    queryClient.removeQueries('single');
    navigate('/');
  };

  return {
    login,
    register,
    logout,
    isLoadingLogin: loginMutation.isLoading,
    isLoadingRegister: registerMutation.isLoading,
  };
};
