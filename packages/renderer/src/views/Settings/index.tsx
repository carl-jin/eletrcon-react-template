import React from 'react';
import { Card, InputNumber, Switch, App, Space } from 'antd';
import useThemeStore from '@renderer/store/theme';
import { useDBSWR } from '@renderer/hooks/useDBSWR';

export default function Settings() {
  const { data, mutate } = useDBSWR<'Setting', 'getSettings'>([
    'Setting.getSettings',
    ['concurrentLimit', 'debugMode'],
  ]);

  const { message } = App.useApp();
  const { isDarkMode, toggleTheme } = useThemeStore();

  const handleNumberChange = (value: number) => {
    message.success('设置已保存');
    localStorage.setItem('concurrentAccounts', value.toString());
  };

  const handleThemeChange = (checked: boolean) => {
    toggleTheme(checked);
    message.success(`已切换到${checked ? '深色' : '浅色'}主题`);
  };

  if (!data) return <></>;

  return (
    <div className="max-w-3xl mx-auto">
      <Space
        direction={'vertical'}
        className={'w-full'}
      >
        <Card
          title={<span>设置</span>}
          bordered={true}
          size={'small'}
        >
          <Space
            direction={'vertical'}
            size={24}
          >
            <Space>
              <span>任务同时运行数量:</span>
              <InputNumber
                min={1}
                max={20}
                value={data.concurrentLimit}
                onChange={(val) => {
                  window.db.Setting.updateSettings('concurrentLimit', val).then(() => {
                    mutate();
                  });
                }}
                className="w-32"
              />
            </Space>

            <Space>
              <span>深色模式:</span>
              <Switch
                checked={isDarkMode}
                checkedChildren={'开'}
                unCheckedChildren={'关'}
                onChange={handleThemeChange}
              />
            </Space>

            <Space>
              <span>Debug 模式:</span>
              <Switch
                checked={data.debugMode}
                checkedChildren={'开'}
                unCheckedChildren={'关'}
                onChange={(checked) => {
                  window.db.Setting.updateSettings('debugMode', checked).then(() => {
                    mutate();
                  });
                }}
              />
            </Space>
          </Space>
        </Card>
      </Space>
    </div>
  );
}
