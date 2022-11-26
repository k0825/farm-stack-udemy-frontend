import { selectCsrfState } from './slices/appSlices';
import { useAppSelector } from './app/hooks';
import { getCsrfToken } from './hooks/csrf';

export const App = () => {
  const csrf = useAppSelector(selectCsrfState);
  getCsrfToken(csrf);

  return <div></div>;
};
