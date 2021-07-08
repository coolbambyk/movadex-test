import React, { useMemo } from 'react';
import moment from 'moment';

const DueDate = ({ date, format }) => {
  const DateA = moment();
  const formatted = useMemo(() => (format ? moment(date).format(format) : moment(date).fromNow()), [date, format]);
  const dayDifference = moment(date).diff(DateA, 'days');
  const color = useMemo(() => {
    if (dayDifference < 0) return 'red';
    return dayDifference > 1 ? 'green' : 'yellow';
  }, [dayDifference]);
  return <span className={color}>{formatted}</span>;
};

export default DueDate;
