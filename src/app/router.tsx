import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import AuthRequired from '~/features/auth/AuthRequired';
import ConfirmEmailPage from '~/pages/ConfirmEmailPage';

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
      <Route path='/confirmemail' element={<ConfirmEmailPage />} />
    </>
  )
);

export default router;
