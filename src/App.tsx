import { selectCsrfState } from './slices/appSlices';
import { useAppSelector } from './app/hooks';
import { getCsrfToken } from './hooks/csrf';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Auth } from './components/Auth';
import { Todo } from './components/Todo';

export const App = () => {
  const csrf = useAppSelector(selectCsrfState);
  getCsrfToken(csrf);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </BrowserRouter>
  );
};
