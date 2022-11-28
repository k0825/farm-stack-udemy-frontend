import { useProcessAuth } from '../hooks/useProcessAuth';
import { ArrowPathIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';

export const Auth = (): JSX.Element => {
  const { login, register, isLoadingLogin, isLoadingRegister } =
    useProcessAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const processAuth = isLogin ? login : register;

  return (
    <>
      {isLoadingLogin || isLoadingRegister ? (
        <div className="flex justify-center items-center flex-col min-h-screen">
          <h1 className="text-xl text-gray-600 font-mono">Loading...</h1>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col min-h-screen text-gray-600 font-mono">
          <div className="flex items-center">
            <CheckBadgeIcon className="h-8 w-8 mr-2 text-blue-500" />
            <span className="text-center text-3xl font-extrabold">
              FARM Stack web app
            </span>
          </div>
          <h2 className="my-6">{isLogin ? 'Login' : 'Create a new account'}</h2>
          <form onSubmit={processAuth}>
            <div>
              <input
                className="mb-3 px-3 text-sm py-2 border border-gray-300"
                name="email"
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoFocus
              />
            </div>
            <div>
              <input
                className="mb-3 px-3 text-sm py-2 border border-gray-300"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                autoFocus
              />
            </div>
            <div className="flex justify-center my-2">
              <button
                className="disable:opacity-40 px-2 py-4 rounded text-white bg-indigo-600"
                disabled={!email || !password}
                type="submit"
              >
                {isLogin ? 'Login' : 'Sign up'}
              </button>
            </div>
          </form>
          <ArrowPathIcon
            onClick={() => setIsLogin(!isLogin)}
            className="h-8 w-8 my-2 text-blue-500 cursor-pointer"
          />
        </div>
      )}
    </>
  );
};
