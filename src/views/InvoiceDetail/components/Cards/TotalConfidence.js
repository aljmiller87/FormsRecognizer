/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import Confidence from "../Confidence";

import { InvoiceDetailStore } from "../../context/InvoiceDetail";

const TotalConfidence = () => {
  const { invoiceState } = useContext(InvoiceDetailStore);

  return (
    <Col sm="6" md="4">
      <Card body>
        <CardTitle tag="h3">Total Confidence</CardTitle>
        <CardText>
          Total confidence:&nbsp;
          <Confidence invoiceIndex={invoiceState.invoice.index} />%
        </CardText>
      </Card>
    </Col>
  );
};

export default TotalConfidence;
