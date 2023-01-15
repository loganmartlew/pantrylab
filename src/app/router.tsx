import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import AuthRequired from '~/features/auth/AuthRequired';
import AppLayout from '~/features/layout/AppLayout';

import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';
import SignupPage from '~/pages/SignupPage';
import ConfirmEmailPage from '~/pages/ConfirmEmailPage';
import UsersPage from '~/pages/UsersPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthRequired />}>
        <Route element={<AppLayout />}>
          <Route path='/' element={<HomePage />} />
          <Route path='/users' element={<UsersPage />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/confirmemail' element={<ConfirmEmailPage />} />
    </>
  )
);

export default router;
