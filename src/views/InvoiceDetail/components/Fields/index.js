import React from "react";
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
  const type = field.type;
  const FieldType = FieldMap[type];
  return <>{FieldType && <FieldType fieldData={field} />}</>;
};

export default FieldComponent;
