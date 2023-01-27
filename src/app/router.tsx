import { createRoutesFromElements, Route } from 'react-router';
import { createBrowserRouter } from 'react-router-dom';

import AuthRequired from '~/features/auth/AuthRequired';
import AppLayout from '~/features/layout/AppLayout';

import HomePage from '~/pages/HomePage';
import LoginPage from '~/pages/LoginPage';
import SignupPage from '~/pages/SignupPage';
import ConfirmEmailPage from '~/pages/ConfirmEmailPage';
import UsersPage from '~/pages/UsersPage';
import HouseholdRequired from '~/features/household/HouseholdRequired';
import InvitesPage from '~/pages/InvitesPage';
import ItemsPage from '~/pages/ItemsPage';
import ListPage from '~/pages/ListPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<AuthRequired />}>
        <Route element={<AppLayout />}>
          <Route element={<HouseholdRequired />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/list' element={<ListPage />} />
            <Route path='/items' element={<ItemsPage />} />
            <Route path='/users' element={<UsersPage />} />
          </Route>
          <Route path='/invites' element={<InvitesPage />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginPage />} />
      <Route path='/signup' element={<SignupPage />} />
      <Route path='/confirmemail' element={<ConfirmEmailPage />} />
    </>
  )
);

export default router;
