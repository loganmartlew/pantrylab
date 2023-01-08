import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
    </>
  )
);

export default router;
