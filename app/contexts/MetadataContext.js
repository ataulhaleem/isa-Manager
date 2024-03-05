import React, { createContext, useState, useContext } from 'react';

// Create a new context
const MetadataContext = createContext();

// Create a provider component
export const MetadataProvider = ({ children }) => {
  const [metadata, setMetadata] = useState({});

  // Value to be provided by the context
  const contextValue = {
    metadata,
    setMetadata,
  };

  return (
    <MetadataContext.Provider value={contextValue}>
      {children}
    </MetadataContext.Provider>
  );
};

// Custom hook to consume the metadata context
export const useMetadata = () => {
  const context = useContext(MetadataContext);
  if (!context) {
    throw new Error('useMetadata must be used within a MetadataProvider');
  }
  return context;
};
