/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useContext } from "react";
import { Col, Card, CardTitle, CardText } from "reactstrap";
import { get } from "lodash";
import { InvoiceDetailStore } from "../../context/InvoiceDetail";

const PhysicalDetails = () => {
  const { invoiceState } = useContext(InvoiceDetailStore);
  const { invoice } = invoiceState;
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
    let allPages = get(invoice, "analysis.data.analyzeResult.readResults", []);
    setPages(allPages);
  }, [invoice]);

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
