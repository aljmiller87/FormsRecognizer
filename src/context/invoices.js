import React, { useEffect, useReducer } from "react";
import { invoices, invoiceStatus } from "../data";

const intitialData = { invoices, invoiceStatus };

export const InvoiceStore = React.createContext();

const reducer = (state, action) => {
  let invoicesClone;
  let index;
  switch (action.type) {
    case "UPDATE_INVOICE":
      invoicesClone = [...state.invoices];
      index = invoicesClone.findIndex(
        (invoice) => invoice.name === action.payload.name
      );
      invoicesClone[index] = action.payload;
      return { ...state, invoices: invoicesClone };
    case "SET_STATE_FROM_STORAGE":
      return action.payload;
    default:
      return state;
  }
};

export const InvoiceStoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, intitialData);

  useEffect(() => {
    let savedState = JSON.parse(
      window.localStorage.getItem("saved_invoice_data")
    );
    if (savedState) {
      dispatch({
        type: "SET_STATE_FROM_STORAGE",
        payload: savedState,
      });
    }
  }, []);

  useEffect(() => {
    console.log("Something in state changed. UseEffect Called");
    window.localStorage.setItem("saved_invoice_data", JSON.stringify(state));
  }, [state]);

  return (
    <InvoiceStore.Provider value={{ state, dispatch }}>
      {props.children}
    </InvoiceStore.Provider>
  );
};
