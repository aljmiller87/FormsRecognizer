/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import styled from "styled-components";
import Analysis from "./components/Analysis";
import Stepper from "./components/Stepper";
import ModalComponent from "./components/ModalComponent";
import { analyzeInvoice } from "../../utilities";
import { InvoiceStore } from "../../context/invoices";
import { InvoiceDetailStore } from "./context/InvoiceDetail";

const InvoiceDetail = () => {
  const { dispatch } = useContext(InvoiceStore);
  const { invoiceState, invoiceDispatch } = useContext(InvoiceDetailStore);

  // Sanity Check
  if (!invoiceState.invoice) {
    return null;
  }

  const submitInvoice = () => {
    console.log("invoiceState before API", invoiceState);
    analyzeInvoice(invoiceState.invoice).then((updatedInvoice) => {
      // If no error
      if (typeof updatedInvoice === "string") {
        // UI logic needed
        return null;
      } else {
        return dispatch({
          type: "UPDATE_INVOICE",
          payload: updatedInvoice,
        });
      }
    });
  };

  const toggle = () =>
    invoiceDispatch({
      type: "TOGGLE_MODAL",
    });

  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <Card>
              {invoiceState.invoice.url && invoiceState.invoice.name && (
                <>
                  <CardImageWrapper>
                    <CardImg
                      top
                      width="100%"
                      src={
                        invoiceState.invoice.url +
                        process.env.REACT_APP_AZURE_SAS
                      }
                      alt="Card image cap"
                      onClick={toggle}
                    />
                  </CardImageWrapper>
                  <CardBody>
                    <CardTitle>{invoiceState.invoice.name}</CardTitle>
                    <CardSubtitle>Card subtitle</CardSubtitle>
                    <CardText>
                      Some quick example text to build on the card title and
                      make up the bulk of the card's content.
                    </CardText>
                    <Button>Button</Button>
                  </CardBody>
                </>
              )}
            </Card>
          </Col>
          <Col md="6">
            <Stepper
              invoice={{ ...invoiceState.invoice }}
              submitInvoice={submitInvoice}
            ></Stepper>
          </Col>
        </Row>
        <Analysis invoice={{ ...invoiceState.invoice }} />
      </div>
      <ModalComponent />
    </>
  );
};

export const CardImageWrapper = styled.div`
  max-height: 150px;
  overflow: hidden;
`;

export default InvoiceDetail;
