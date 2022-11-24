import axios from 'axios';
import { useEffect } from 'react';
import { selectCsrfState } from './slices/appSlices';
import { CsrfToken } from './types/types';
import { useAppSelector } from './app/hooks';
import { getCsrfToken } from './hooks/csrf';

export const App = () => {
  const csrf = useAppSelector(selectCsrfState);
  getCsrfToken(csrf);

  return <div></div>;
};
