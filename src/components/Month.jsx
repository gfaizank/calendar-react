import React from 'react';
import { format } from 'date-fns';
import DaysInMonths from './DaysInMonths';

const Month = ({ monthIndex, setSelectedDate, currentDate, events }) => {
  const totalMonths = 12;
  const monthsToShow = 6;
  const currentMonthIndex = (monthIndex + monthsToShow) % totalMonths;
  const currentMonth = new Date(0, currentMonthIndex);
  const monthName = format(currentMonth, 'MMMM');

  return (
    <div className="month">
      <h2>{monthName}</h2>
      <DaysInMonths
        month={currentMonth}
        setSelectedDate={setSelectedDate}
        currentDate={currentDate}
        events={events}
      />
    </div>
  );
};

export default Month;

