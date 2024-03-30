import React, { createContext, useContext, useState } from 'react';

const SignUpContext = createContext();

export const SignUpProvider = ({ children }) => {
  const [imageUrl, setImageUrl] = useState(null);

  return (
    <SignUpContext.Provider value={{ imageUrl, setImageUrl }}>
      {children}
    </SignUpContext.Provider>
  );
};

export const useSignUpContext = () => useContext(SignUpContext);
