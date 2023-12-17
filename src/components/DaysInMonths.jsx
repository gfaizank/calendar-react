// DaysInMonths.jsx
import React, { useState, useEffect } from 'react';
import { format, getDaysInMonth, getDay, addDays } from 'date-fns';

const DaysInMonths = ({ month: propMonth, setSelectedDate, currentDate, events }) => {
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
  }, [propMonth, events]);

  const firstDayOfMonth = getDay(displayMonth);
  const daysInMonth = getDaysInMonth(displayMonth);

  const blanks = Array(firstDayOfMonth).fill(null);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Add days to each day of the week
  const daysWithWeekday = days.map((day) => {
    const date = addDays(displayMonth, day - 1);
    return { day, weekday: getDay(date) };
  });

  return (
    <div className="days">
      {[...blanks, ...daysWithWeekday].map((item, index) => {
        if (!item) {
          return (
            <div key={index} className="blank">
              {/* Render your blank day content here */}
            </div>
          );
        }

        const { day, weekday } = item;

        // Compare year, month, and day to check if it's the current date
        const isCurrentDate =
          day === displayCurrentDate.getDate() &&
          displayMonth.getMonth() === displayCurrentDate.getMonth() &&
          displayMonth.getFullYear() === displayCurrentDate.getFullYear();

        const currentDateClass = isCurrentDate ? 'current-date' : '';
        const dayOfWeekClass = `day-of-week-${weekday}`;

        return (
          <div
            key={index}
            className={`day ${currentDateClass} ${dayOfWeekClass}`}
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
