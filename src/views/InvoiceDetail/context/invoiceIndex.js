import React, { useEffect, useReducer } from "react";
export const InvoiceIndexStore = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INDEX_OF_INVOICE":
      return action.payload;
    default:
      return state;
  }
};

export const InvoiceIndexStoreProvider = ({ children, index }) => {
  const [indexState, indexDispatch] = useReducer(reducer, index);

  useEffect(() => {
    indexDispatch({
      type: "SET_INDEX_OF_INVOICE",
      payload: index,
    });
  }, [index]);

  return (
    <InvoiceIndexStore.Provider value={{ indexState, indexDispatch }}>
      {children}
    </InvoiceIndexStore.Provider>
  );
};
