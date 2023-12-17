import React, { useState, useEffect } from 'react';
import { format, getDaysInMonth, getDay } from 'date-fns';

const DaysInMonths = ({ month: propMonth, setSelectedDate, currentDate }) => {
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [displayCurrentDate, setDisplayCurrentDate] = useState(new Date());

  useEffect(() => {
    const liveDate = new Date();
    const newMonth = new Date(liveDate.getFullYear(), propMonth.getMonth(), 1);

    // Check if the new month is a valid date
    if (!isNaN(newMonth.getTime())) {
      setDisplayMonth(newMonth);
      setDisplayCurrentDate(liveDate);
    }
  }, [propMonth]);

  const firstDayOfMonth = getDay(displayMonth);
  const daysInMonth = getDaysInMonth(displayMonth);

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  return (
    <div className="days">
      {[...blanks, ...days].map((day, index) => {
        // Compare year, month, and day to check if it's the current date
        const isCurrentDate =
          day === displayCurrentDate.getDate() &&
          displayMonth.getMonth() === displayCurrentDate.getMonth() &&
          displayMonth.getFullYear() === displayCurrentDate.getFullYear();

        const currentDateClass = isCurrentDate ? 'current-date' : '';

        return (
          <div
            key={index}
            className={day ? `day ${currentDateClass}` : 'blank'}
            onClick={() => setSelectedDate(`${format(displayMonth, 'yyyy-MM')}-${day}`)}
          >
            {day}
          </div>
        );
      })}
    </div>
  );
};

export default DaysInMonths;

