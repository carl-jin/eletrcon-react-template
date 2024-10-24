import Home from '@renderer/views/Home';
import Settings from '@renderer/views/Settings';
import TaskList from '@renderer/views/TaskList';
import { createMemoryRouter, redirect } from 'react-router-dom';
import { RouterNameEnum } from '../enums';
import History from '@renderer/views/History';
import LogList from '@renderer/views/LogList';

const router = createMemoryRouter([
  {
    path: '/',
    element: <Home />,
    loader: () => redirect(`/${RouterNameEnum.TASK_LIST}`),
  },
  {
    path: `/${RouterNameEnum.TASK_LIST}`,
    element: <TaskList />,
  },
  {
    path: `/${RouterNameEnum.SETTINGS}`,
    element: <Settings />,
  },
  {
    path: `/${RouterNameEnum.HISTORY}`,
    element: <History />,
  },
  {
    path: `/${RouterNameEnum.LOG_LIST}`,
    element: <LogList />,
  },
]);

export default router;
