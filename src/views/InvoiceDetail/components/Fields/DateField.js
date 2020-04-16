import React from "react";
import styled from "styled-components";

const DateField = ({ fieldData }) => {
  if (!fieldData) {
    return <div>DateField</div>;
  }

  const renderDetails = () => {
    return (
      <>
        <b>{fieldData.dataTitle}</b>
        <span>{fieldData.text}</span>
        <span>{fieldData.valueDate}</span>
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

export default DateField;
