import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');


  return (
    <UserContext.Provider value={{ username, setUsername ,bio,setBio}}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
