import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import AuthRequired from '~/features/auth/AuthRequired';
import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';
import SignupPage from '~/pages/SignupPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthRequired />}>
        <Route path='/' element={<HomePage />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
    </>
  )
);

export default router;
