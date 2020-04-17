import React, { useContext } from "react";
import {
  Button,
  Card,
  CardImg,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { InvoiceDetailStore } from "../context/InvoiceDetail";

const ModalComponent = () => {
  const { invoiceState, invoiceDispatch } = useContext(InvoiceDetailStore);
  const toggle = () =>
    invoiceDispatch({
      type: "TOGGLE_MODAL",
    });

  // Sanity Check
  if (!invoiceState.invoice) {
    return null;
  }

  return (
    <Modal isOpen={invoiceState.modal} toggle={toggle}>
      <ModalBody>
        <Card>
          <CardImg
            top
            width="100%"
            src={invoiceState.invoice.url + process.env.REACT_APP_AZURE_SAS}
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
  );
};

export default ModalComponent;
