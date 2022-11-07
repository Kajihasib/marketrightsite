import { TextField } from "@mui/material";
import { useField } from "formik";
import { at } from "lodash";
import React from "react";

function SelectField(props) {
  const { label, data, ...rest } = props;
  const [field, meta] = useField(props);
  const { value: selectedValue } = field;
  const [touched, error] = at(meta, "touched", "error");
  const isError = touched && error && true;
  return (
    <TextField
      {...rest}
      fullWidth
      FormHelperTextProps={{
        component: "div",
      }}
      {...field}
      value={selectedValue ? selectedValue : ""}
      select
      label={label}
      error={isError}
      helperText={isError && error}
    >
      {props.children}
    </TextField>
  );
}
export default SelectField;
