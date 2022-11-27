import axios from 'axios';
import { useEffect } from 'react';
import { CsrfToken } from '../types/types';

export const useCsrfToken = (csrf: boolean) => {
  useEffect(() => {
    (async () => {
      const res = await axios.get<CsrfToken>(
        `${process.env.REACT_APP_API_URL}/csrftoken`
      );
      axios.defaults.headers.common['X-CSRF-Token'] = res.data.csrf_token;
      console.log(res.data.csrf_token);
    })();
  }, [csrf]);
};
