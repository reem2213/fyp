// NotificationsContext.js
import React, { createContext, useState } from 'react';

export const NotificationsContext = createContext();

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  const addNotification = (notification) => {
    setNotifications((prevNotifications) => [...prevNotifications, notification]);
    setNotificationCount((prevCount) => prevCount + 1);
  };

  return (
    <NotificationsContext.Provider value={{ notifications, notificationCount, addNotification }}>
      {children}
    </NotificationsContext.Provider>
  );
};
