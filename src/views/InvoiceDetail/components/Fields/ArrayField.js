import React from "react";
import styled from "styled-components";
import FieldComponent from "./index";

const ArrayField = ({ fieldData }) => {
  if (!fieldData) {
    return <div>ArrayField</div>;
  }

  const renderChildFields = (subFields) => {
    return subFields.map((field, index) => {
      return <FieldComponent key={field.type + index} field={field} />;
    });
  };

  const renderDetails = () => {
    return (
      <>
        <b>{fieldData.dataTitle}</b>
        <div className="fieldGroup">
          {renderChildFields(fieldData.valueArray)}
        </div>
      </>
    );
  };
  return <Item>{fieldData && renderDetails()}</Item>;
};

export const Item = styled.div`
  padding: 8px 0;
  width: 100%;
`;

export default ArrayField;
