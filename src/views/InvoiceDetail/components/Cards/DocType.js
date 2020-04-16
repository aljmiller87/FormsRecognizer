/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import { get } from "lodash";

const DocType = ({ data }) => {
  if (!data) {
    return null;
  }
  const [docType, setDocType] = useState("");
  useEffect(() => {
    let type = get(data, "analyzeResult.documentResults[0].docType", {});
    setDocType(type);
  }, [data]);

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
