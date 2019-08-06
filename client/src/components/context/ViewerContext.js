import React, { useState, createContext } from "react";

export const ViewerContext = createContext();

export const ViewerProvider = props => {
  const [viewer, setViewer] = useState(); //It's very important to initialise this state to an empty array!

  return (
    <ViewerContext.Provider value={[viewer, setViewer]}>{props.children}</ViewerContext.Provider>
  );
};
