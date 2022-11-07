import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
const MultiCheckbox = ({ field, form, label, ...rest }) => {
  const { name, value: formikValue } = field;
  const { setFieldValue } = form;
  const handleChange = (event) => {
    const values = formikValue || [];
    const index = values.indexOf(rest.value);
    if (index === -1) {
      values.push(rest.value);
    } else {
      values.splice(index, 1);
    }
    setFieldValue(name, values);
  };

  return (
    <FormControlLabel
      className="addQuestionLabel"
      control={
        <Checkbox
          onChange={handleChange}
          checked={formikValue?.indexOf(rest.value) !== -1}
          {...rest}
        />
      }
      label={label}
    />
  );
};

export default MultiCheckbox;
