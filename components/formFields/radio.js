import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { Fragment } from "react";
const renderOptions = (options) => {
  return options.map((option) => (
    <FormControlLabel
      key={option.value}
      value={option.value}
      control={<Radio />}
      label={option.label}
    />
  ));
};

const CustomRadioGroup = ({
  field,
  touched,
  errors,
  name,
  options,
  children,
  ...props
}) => {
  return (
    <Fragment>
      <RadioGroup {...field} {...props} name={name}>
        {options ? renderOptions(options) : children}
      </RadioGroup>
    </Fragment>
  );
};

export default CustomRadioGroup;
