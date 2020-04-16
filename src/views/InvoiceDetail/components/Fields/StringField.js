import React from "react";
import styled from "styled-components";

const StringField = ({ fieldData }) => {
  if (!fieldData) {
    return <div>StringField</div>;
  }

  const renderDetails = () => {
    return (
      <>
        <b>{fieldData.dataTitle}</b>
        <span>{fieldData.text || "N/A"}</span>
        <span>{fieldData.valueString}</span>
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

export default StringField;
