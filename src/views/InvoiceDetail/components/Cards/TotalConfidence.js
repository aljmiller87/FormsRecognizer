import React from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
// import { get } from "lodash";

const TotalConfidence = ({ data }) => {
  if (!data) {
    return null;
  }
  return (
    <Col sm="6" md="4">
      <Card body>
        <CardTitle tag="h3">Total Confidence</CardTitle>
        <CardText>Total confidence:</CardText>
      </Card>
    </Col>
  );
};

export default TotalConfidence;
