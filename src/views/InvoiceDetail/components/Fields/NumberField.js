import React from "react";
import styled from "styled-components";

const NumberField = ({ fieldData }) => {
  if (!fieldData) {
    return <div>NumberField</div>;
  }

  const renderDetails = () => {
    return (
      <>
        <b>{fieldData.dataTitle}</b>
        <span>{fieldData.text || "N/A"}</span>
        <span>{fieldData.valueNumber}</span>
        <span>{fieldData.confidence}</span>
      </>
    );
  };
  return <Item>{fieldData && renderDetails()}</Item>;
};

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
`;

export default NumberField;
