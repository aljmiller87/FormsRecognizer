/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import { reduce } from "lodash";

import { InvoiceStore } from "../../../../context/invoices";
import { InvoiceIndexStore } from "../../context/invoiceIndex";

const TotalConfidence = ({ data }) => {
  if (!data) {
    return null;
  }

  const { state } = useContext(InvoiceStore);
  const { indexState } = useContext(InvoiceIndexStore);

  const [confidence, setConfidence] = useState(0);

  const calculateAverageConfidence = (arr) => {
    const total = reduce(arr, (sum, n) => sum + n.confidence, 0);
    const average = total / arr.length;
    const percentage = average * 100;
    return percentage;
  };

  useEffect(() => {
    const invoice = state.invoices[indexState];
    if (invoice) {
      const confidenceArr = invoice.analysis.confidence;
      const averageConf = calculateAverageConfidence(confidenceArr);
      setConfidence(averageConf);
    }
  }, [state.invoices[indexState]]);

  return (
    <Col sm="6" md="4">
      <Card body>
        <CardTitle tag="h3">Total Confidence</CardTitle>
        <CardText>Total confidence: {confidence}%</CardText>
      </Card>
    </Col>
  );
};

export default TotalConfidence;
