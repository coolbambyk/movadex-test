import React, { useState, useCallback } from 'react';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import { ICON_AFTER_POSITION } from 'react-dates/constants';
import { DATE_FORMAT } from 'constants/date';

export default function DatePicker(props) {
  const { onChange, ...rest } = props;
  const [isFocused, setIsFocused] = useState(false);
  const onFocusChange = useCallback(({ focused }) => setIsFocused(focused), []);

  return (
    <SingleDatePicker
      onDateChange={onChange}
      focused={isFocused}
      onFocusChange={onFocusChange}
      showClearDate
      showDefaultInputIcon
      inputIconPosition={ICON_AFTER_POSITION}
      displayFormat={DATE_FORMAT}
      {...rest}
    />
  );
}
