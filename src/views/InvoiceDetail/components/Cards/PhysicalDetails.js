/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import { get } from "lodash";

const PhysicalDetails = ({ data }) => {
  if (!data) {
    return null;
  }

  const [pages, setPages] = useState([]);

  const renderPhysicalDetails = () => {
    return pages.map((page, index) => (
      <div key={index}>
        <h4>Page: {page.page}</h4>
        <div>
          <CardText>Language: {page.language}</CardText>
          <CardText>
            Height: {page.height} {page.unit}
          </CardText>
          <CardText>
            Width: {page.width} {page.unit}
          </CardText>
        </div>
      </div>
    ));
  };

  useEffect(() => {
    let allPages = get(data, "analyzeResult.readResults", []);
    setPages(allPages);
  }, [data]);

  return (
    <Col sm="6" md="4">
      <Card body>
        <CardTitle tag="h3">Physical Details</CardTitle>
        <div>
          Total Pages: {pages.length}
          {renderPhysicalDetails()}
        </div>
      </Card>
    </Col>
  );
};

export default PhysicalDetails;
