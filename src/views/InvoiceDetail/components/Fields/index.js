import React, { useState, useContext } from "react";
import { InvoiceStore } from "../../../../context/invoices";
import { InvoiceDetailStore } from "../../context/InvoiceDetail";
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
  console.log("FieldComponent field prop", field);
  const { state, dispatch } = useContext(InvoiceStore);
  const { invoiceState } = useContext(InvoiceDetailStore);
  const { invoice } = invoiceState;
  const [hasSentConfidenceLevel, setHasSentConfidenceLevel] = useState(false);

  if (!invoice) {
    return null;
  }

  const generateID = () => {
    return `${invoice.index}_${field.dataTitle}_${field.type}`;
  };

  const isAFieldWithConfidenceMetric = () => {
    return typeof field.confidence === "number" && !hasSentConfidenceLevel;
  };

  const isConfidenceRecorded = () => {
    const confidenceArr = invoice.analysis.confidence;
    const id = generateID();
    const confidenceIndex = confidenceArr.findIndex(
      (item) => item.confidenceID === id
    );
    return confidenceIndex >= 0;
  };

  const highlightField = () => {
    console.log("!field.boundingBox", !field.boundingBox);
    if (!field.boundingBox) {
      return null;
    }
    const { boundingBox } = field;
    const coordinates = {
      confidenceID: generateID(),
      topLeft: [boundingBox[0], boundingBox[1]],
      topRight: [boundingBox[2], boundingBox[3]],
      bottomRight: [boundingBox[4], boundingBox[5]],
      bottomLeft: [boundingBox[6], boundingBox[7]],
    };
    console.log("coordinates", coordinates);
  };

  if (isAFieldWithConfidenceMetric() && !isConfidenceRecorded()) {
    setHasSentConfidenceLevel(true);
    const confidenceObj = {
      ...field,
      confidenceID: generateID(),
    };
    console.log("confidenceObj", confidenceObj);
    dispatch({
      type: "ADD_CONFIDENCE",
      payload: {
        index: invoice.index,
        field: confidenceObj,
      },
    });
  }
  const type = field.type;
  const FieldType = FieldMap[type];
  return (
    <div className="field" onClick={highlightField}>
      {FieldType && <FieldType fieldData={field} />}
    </div>
  );
};

export default FieldComponent;
