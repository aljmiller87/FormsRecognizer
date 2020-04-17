/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useReducer, useContext } from "react";
import { InvoiceStore } from "../../../context/invoices";
import { useParams, useHistory } from "react-router-dom";

// Utilities
import { fetchInvoiceIndexByName, isResponseValid } from "../utilities";
import { fetchInvoiceResults } from "../../../utilities";

export const InvoiceDetailStore = React.createContext();

// Interface
const initialState = {
  invoice: {
    name: "",
    url: "",
    status: 0,
    analysis: {
      apiKey: "",
      data: {},
      confidence: [],
    },
  },
  modal: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_INVOICE":
      return { ...state, ...action.payload };
    case "TOGGLE_MODAL":
      console.log("TOGGLE_MODAL called", "state", state);
      return { ...state, modal: !state.modal };
    default:
      return state;
  }
};

export const InvoiceDetailStoreProvider = ({ children }) => {
  const { name } = useParams(); // Fetching receipt name from URL
  const history = useHistory();
  const [invoiceState, invoiceDispatch] = useReducer(reducer, initialState);
  const { state, dispatch } = useContext(InvoiceStore);

  const checkResults = (inv) => {
    // Prevent firing function on every re-render
    // if (loading) {
    //   return null;
    // }
    // if (!isLoading) {
    //   setIsLoading(true);
    // }
    fetchInvoiceResults(inv).then((response) => {
      if (!isResponseValid(response)) {
        return null;
      }
      let updatedInvoice = { ...inv };
      updatedInvoice.analysis.data = response.data;
      if (response.data.status === "succeeded") {
        updatedInvoice.status = updatedInvoice.status + 1;
        // setIsLoading(false);
      }
      dispatch({
        type: "UPDATE_INVOICE",
        payload: updatedInvoice,
      });
      if (response.data.status !== "succeeded") {
        const promise = new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 5000);
        });
        return promise.then(() => checkResults(updatedInvoice));
      }
    });
  };

  useEffect(() => {
    const { foundInvoice, foundIndex } = fetchInvoiceIndexByName(
      state.invoices,
      name
    );
    if (typeof foundIndex === "number" && foundIndex >= 0 && foundInvoice) {
      const invoice = { ...foundInvoice, index: foundIndex };
      invoiceDispatch({
        type: "SET_INVOICE",
        payload: { invoice },
      });
    } else {
      console.warn("Invoice not found. Redirecting to invoice list.");
      history.push("/admin/data");
    }
  }, [state.invoices, name, history]);

  useEffect(() => {
    if (invoiceState.invoice.status === 1) {
      checkResults(invoiceState.invoice);
    }
  }, [invoiceState.invoice.status]);

  return (
    <InvoiceDetailStore.Provider value={{ invoiceState, invoiceDispatch }}>
      {children}
    </InvoiceDetailStore.Provider>
  );
};

export const useInvoiceIndex = () => {
  const context = useContext(InvoiceDetailStore);

  if (!context) {
    console.log("Could not fetch context");
    return false;
  }

  return context;
};
