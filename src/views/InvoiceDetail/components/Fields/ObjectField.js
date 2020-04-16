/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { get } from "lodash";

import FieldComponent from "./index";

const ObjectField = ({ fieldData }) => {
  if (!fieldData) {
    return <div>ObjectField</div>;
  }

  const [allFieldsArray, setAllFieldsArray] = useState([]);
  const [allFieldsObj, setAllFieldsObj] = useState({});

  useEffect(() => {
    let fields = get(fieldData, "valueObject", false);
    if (!fields) {
      return null;
    }

    let fieldsArray = Object.keys(fields);
    setAllFieldsArray(fieldsArray);
    setAllFieldsObj(fields);
  }, [fieldData]);

  const renderFields = () => {
    return allFieldsArray.map((item, index) => {
      const fieldData = { ...allFieldsObj[item] };
      fieldData["dataTitle"] = item;
      return <FieldComponent key={index} field={fieldData} />;
    });
  };
  return <ObjectItem>{fieldData && renderFields()}</ObjectItem>;
  // return <ObjectItem>Object Field</ObjectItem>;
};

export const ObjectItem = styled.div`
  font-size: 0.8em;
  padding: 8px 0 8px 8px;
  width: 100%;
`;

export default ObjectField;
