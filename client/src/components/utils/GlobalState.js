// use this for authenication
// maybe for a dark mode later on as well

import React, { createContext, useReducer, useContext } from "react";

const StoreContext = createContext();
const { Provider } = StoreContext;

const reducer = (state, action) => {
  switch (action.type) {
  case "SET_MODE":
    return {
      ...state,
      mode: action.mode
    }
  // case "SET_USER":
  //   return {
  //     ...state,
  //     user: action.user
  //   }
  default:
    return state;
  }
};

const StoreProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useReducer(reducer, {
    mode: "light",
    // user: ""
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useStoreContext = () => {
  return useContext(StoreContext);
};

export { StoreProvider, useStoreContext };