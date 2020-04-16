/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
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
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import styled from "styled-components";
import Analysis from "./components/analysis";
import Stepper from "./components/Stepper";
import { InvoiceStore } from "../../context/invoices";
import { analyzeInvoice, fetchInvoiceResults } from "../../utilities";
import { InvoiceIndexStoreProvider } from "./context/invoiceIndex";

const InvoiceDetail = () => {
  let { name } = useParams(); // Fetching receipt name from URL
  const { state, dispatch } = useContext(InvoiceStore);
  const [invoice, setInvoice] = useState({});
  const [invoiceIndex, setInvoiceIndex] = useState(false);
  const [modal, setModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchInvoiceIndexByName = (invoiceName) => {
    if (!state.invoices || !state.invoices.length) {
      return {};
    }
    const foundIndex = state.invoices.findIndex(
      (invoice) => invoice.name === invoiceName
    );
    const foundInvoice = state.invoices[foundIndex];
    return { foundInvoice, foundIndex };
  };

  const submitInvoice = () => {
    analyzeInvoice(invoice).then((updatedInvoice) => {
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

  const toggle = () => setModal(!modal);

  const isResponseValid = (resp) => {
    return (
      typeof resp === "object" &&
      resp.status &&
      resp.status === 200 &&
      resp.data &&
      resp.data.status
    );
  };

  const checkResults = (loading = isLoading, inv = invoice) => {
    // Prevent firing function on every re-render
    if (loading) {
      return null;
    }
    if (!isLoading) {
      setIsLoading(true);
    }
    fetchInvoiceResults(inv).then((response) => {
      if (!isResponseValid(response)) {
        return null;
      }
      let updatedInvoice = { ...inv };
      updatedInvoice.analysis.data = response.data;
      if (response.data.status === "succeeded") {
        updatedInvoice.status = updatedInvoice.status + 1;
        setIsLoading(false);
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
        return promise.then(() => checkResults(false, updatedInvoice));
      }
    });
  };

  useEffect(() => {
    const invoiceData = fetchInvoiceIndexByName(name);
    const { foundInvoice, foundIndex } = invoiceData;

    if (foundInvoice) {
      setInvoice(foundInvoice);
    }

    if (typeof foundIndex === "number") {
      setInvoiceIndex(foundIndex);
    }

    if (invoice.status === 1) {
      checkResults(isLoading, invoice);
    }

    if (invoice.status !== 1 && isLoading) {
      setIsLoading(false);
    }
  }, [state]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <Card>
              {invoice && Object.keys(invoice).length && (
                <>
                  <CardImageWrapper>
                    <CardImg
                      top
                      width="100%"
                      src={invoice.url + process.env.REACT_APP_AZURE_SAS}
                      alt="Card image cap"
                      onClick={toggle}
                    />
                  </CardImageWrapper>
                  <CardBody>
                    <CardTitle>{invoice.name}</CardTitle>
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
            <Stepper invoice={invoice} submitInvoice={submitInvoice}></Stepper>
          </Col>
        </Row>
        <InvoiceIndexStoreProvider index={invoiceIndex}>
          <Analysis invoice={invoice} />
        </InvoiceIndexStoreProvider>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <Card>
            <CardImg
              top
              width="100%"
              src={invoice.url + process.env.REACT_APP_AZURE_SAS}
              alt="Card image cap"
            />
          </Card>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const CardImageWrapper = styled.div`
  max-height: 150px;
  overflow: hidden;
`;

export default InvoiceDetail;
