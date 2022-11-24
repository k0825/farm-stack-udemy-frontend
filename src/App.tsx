import axios from 'axios';
import { useEffect } from 'react';
import { selectCsrfState } from './slices/appSlices';
import { CsrfToken } from './types/types';
import { useAppSelector } from './app/hooks';

const App = () => {
  const csrf = useAppSelector(selectCsrfState);

  useEffect(() => {
    const getCsrfToken = async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrftoken`
      );
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token;
      console.log(res.data.csrf_token);
    };
    getCsrfToken();
  }, [csrf]);

  return <div></div>;
};

export default App;
