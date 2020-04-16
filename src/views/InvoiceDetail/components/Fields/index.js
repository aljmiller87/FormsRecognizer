import React, { useState, useContext } from "react";
import { InvoiceStore } from "../../../../context/invoices";
import { InvoiceIndexStore } from "../../context/invoiceIndex";
import StringField from "./StringField";
import DateField from "./DateField";
import TimeField from "./TimeField";
import ArrayField from "./ArrayField";
import NumberField from "./NumberField";
import ObjectField from "./ObjectField";

const FieldMap = {
  string: StringField,
  date: DateField,
  time: TimeField,
  array: ArrayField,
  number: NumberField,
  object: ObjectField,
};

const FieldComponent = ({ field }) => {
  const { state, dispatch } = useContext(InvoiceStore);
  const { indexState } = useContext(InvoiceIndexStore);
  const [hasSentConfidenceLevel, setHasSentConfidenceLevel] = useState(false);

  const generateID = () => {
    return `${indexState}_${field.dataTitle}_${field.type}`;
  };

  const isAFieldWithConfidenceMetric = () => {
    return (
      indexState >= 0 &&
      typeof field.confidence === "number" &&
      !hasSentConfidenceLevel
    );
  };

  const isConfidenceRecorded = () => {
    const inv = state.invoices[indexState];
    const confidenceArr = inv.analysis.confidence;
    const id = generateID();
    const confidenceIndex = confidenceArr.findIndex(
      (item) => item.confidenceID === id
    );
    return confidenceIndex >= 0;
  };

  if (isAFieldWithConfidenceMetric() && !isConfidenceRecorded()) {
    setHasSentConfidenceLevel(true);
    const confidenceObj = {
      ...field,
      confidenceID: generateID(),
    };
    dispatch({
      type: "ADD_CONFIDENCE",
      payload: {
        index: indexState,
        field: confidenceObj,
      },
    });
  }
  const type = field.type;
  const FieldType = FieldMap[type];
  return <>{FieldType && <FieldType fieldData={field} />}</>;
};

export default FieldComponent;
