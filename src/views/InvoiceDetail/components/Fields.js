/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Col } from "reactstrap";
import { get } from "lodash";
import FieldComponent from "./Fields/index";

const Fields = ({ data }) => {
  if (!data) {
    return null;
  }

  const [allFieldsArray, setAllFieldsArray] = useState([]);
  const [allFieldsObj, setAllFieldsObj] = useState({});

  useEffect(() => {
    let fields = get(data, "analyzeResult.documentResults[0].fields", false);
    if (fields) {
      let fieldsArray = Object.keys(fields);
      setAllFieldsArray(fieldsArray);
      setAllFieldsObj(fields);
    }
  }, [data]);

  const renderFields = () => {
    return allFieldsArray.map((item, index) => {
      const fieldData = { ...allFieldsObj[item] };
      fieldData["dataTitle"] = item;
      return <FieldComponent key={index} field={fieldData} />;
    });
  };

  return (
    <Col style={{ color: "#ddd" }}>
      <h3 className="nav-tabs">All Fields</h3>
      {renderFields()}
    </Col>
  );
};

export default Fields;
