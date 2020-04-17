/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import { get } from "lodash";
import { InvoiceDetailStore } from "../../context/InvoiceDetail";

const DocType = () => {
  const { invoiceState } = useContext(InvoiceDetailStore);
  const { invoice } = invoiceState;

  const [docType, setDocType] = useState("");
  useEffect(() => {
    let type = get(
      invoice,
      "analysis.data.analyzeResult.documentResults[0].docType",
      "No Data"
    );
    setDocType(type);
  }, [invoice]);

  return (
    <Col sm="6" md="4">
      <Card body>
        <CardTitle tag="h3">Document Type</CardTitle>
        <CardText>{docType}:</CardText>
      </Card>
    </Col>
  );
};

export default DocType;
