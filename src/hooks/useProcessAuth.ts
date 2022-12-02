import { FormEvent } from 'react';
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

  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth();

  const login = (e: FormEvent<HTMLFormElement>) => {
    loginMutation.mutate({
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    });
  };

  const register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await registerMutation
      .mutateAsync({
        email: e.currentTarget.email.value,
        password: e.currentTarget.password.value,
      })
      .then(() => {
        loginMutation.mutate({
          email: e.currentTarget.email.value,
          password: e.currentTarget.password.value,
        });
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
