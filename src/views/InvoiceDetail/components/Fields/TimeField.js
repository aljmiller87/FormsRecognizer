import React from "react";
import styled from "styled-components";

const TimeField = ({ fieldData }) => {
  if (!fieldData) {
    return <div>TimeField</div>;
  }

  const renderDetails = () => {
    return (
      <>
        <b>{fieldData.dataTitle}</b>
        <span>{fieldData.text}</span>
        <span>{fieldData.valueTime}</span>
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

export default TimeField;
