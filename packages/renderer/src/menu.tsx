import { HomeOutlined } from '@ant-design/icons';
import { RouterNameEnum } from '@renderer/enums';
import { MenuProps } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

export default [
  {
    key: RouterNameEnum.DASHBOARD,
    icon: <HomeOutlined />,
    label: '仪表盘',
  },
] as MenuItem[];
