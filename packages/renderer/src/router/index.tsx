import Home from '@renderer/views/Home';
import { createMemoryRouter, redirect } from 'react-router-dom';
import { RouterNameEnum } from '../enums';
import Dashboard from '@renderer/views/Dashboard';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Home />,
    loader: () => redirect(`/${RouterNameEnum.DASHBOARD}`),
  },
  {
    path: `/${RouterNameEnum.DASHBOARD}`,
    element: <Dashboard />,
  },
]);

export default router;
