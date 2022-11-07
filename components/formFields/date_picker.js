import MomentUtils from '@date-io/moment';
import Grid from '@material-ui/core/Grid';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
const DatePickerField = (props) => {
  const [field, meta, helper] = useField(props);
  const { touched, error } = meta;
  const { setValue } = helper;
  const isError = touched && error && true;
  const { value } = field;
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
    }
  }, [value]);

  function _onChange(date) {
    if (date) {
      setSelectedDate(date);
      try {
        const ISODateString = date.toISOString();
        setValue(ISODateString);
      } catch (error) {
        setValue(date);
      }
    } else {
      setValue(date);
    }
  }

  return (
    <Grid container>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          {...field}
          {...props}
          value={selectedDate}
          onChange={_onChange}
          inputVariant="outlined"
          error={isError}
          invalidDateMessage={isError && error}
          helperText={isError && error}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
};
export default DatePickerField;
