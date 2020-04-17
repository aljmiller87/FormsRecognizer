/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { reduce } from "lodash";

import { InvoiceStore } from "../../../context/invoices";

const Confidence = ({ invoiceIndex }) => {
  const { state } = useContext(InvoiceStore);

  const [confidence, setConfidence] = useState(0);

  const calculateAverageConfidence = (arr) => {
    const total = reduce(arr, (sum, n) => sum + n.confidence, 0);
    const average = total / arr.length;
    const percentage = average * 100;
    return percentage.toFixed(2);
  };

  useEffect(() => {
    const invoice = state.invoices[invoiceIndex];
    if (invoice) {
      const confidenceArr = invoice.analysis.confidence;
      const averageConf = calculateAverageConfidence(confidenceArr);
      setConfidence(averageConf);
    }
  }, [state.invoices[invoiceIndex]]);

  if (!state || !(invoiceIndex >= 0)) {
    return null;
  }

  return <b>{confidence}</b>;
};

export default Confidence;
