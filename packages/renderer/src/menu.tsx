import {
  BugOutlined,
  FieldTimeOutlined,
  SettingOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { RouterNameEnum } from '@renderer/enums';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export default [
  {
    key: RouterNameEnum.TASK_LIST,
    icon: <UnorderedListOutlined />,
    label: '任务列表',
  },
  {
    key: RouterNameEnum.SETTINGS,
    icon: <SettingOutlined />,
    label: '设置中心',
  },
  {
    key: RouterNameEnum.HISTORY,
    icon: <FieldTimeOutlined />,
    label: '历史记录',
  },
  {
    key: RouterNameEnum.LOG_LIST,
    icon: <BugOutlined />,
    label: '执行日志',
  },
] as MenuItem[];
