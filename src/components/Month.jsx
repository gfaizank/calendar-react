// Month.js

import React from 'react';
import { format } from 'date-fns';
import DaysInMonths from './DaysInMonths';

const Month = ({ monthIndex, setSelectedDate, currentDate }) => {
  const currentMonth = new Date(0, monthIndex);
  const monthName = format(currentMonth, 'MMMM');

  return (
    <div className="month">
      <h2>{monthName}</h2>
      <DaysInMonths
        month={currentMonth}
        setSelectedDate={setSelectedDate}
        currentDate={currentDate}
      />
    </div>
  );
};

export default Month;