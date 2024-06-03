import React, { useMemo, useRef } from 'react';
import { Button, Divider, InputNumber, notification, Space, Switch } from 'antd';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const Context = React.createContext({
  name: 'Default',
});
const Notification = () => {
  const [enabled, setEnabled] = React.useState(true);
  const [threshold, setThreshold] = React.useState(3);
  // const myModal = useRef()

  const [api, contextHolder] = notification.useNotification({
    stack: enabled
      ? {
          threshold,
        }
      : false,
  });
  const openNotification = () => {
    api.open({
      message: 'Notification GHJK',
      description: `${Array(Math.round(Math.random() * 5) + 1)
        .fill('This is the content of the notification.')
        .join('\n')}`,
      duration: null,
   
    });

  };

  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  
  );
  return (
    <Context.Provider value={contextValue }  >
      {contextHolder}
      <div>

        <NotificationsActiveIcon   style={{ marginTop:"20px"}} onClick={openNotification}>
         Bildiriş
        </NotificationsActiveIcon >
      </div>
    </Context.Provider>
  );
};
export default Notification;
