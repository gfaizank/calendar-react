import React, { useState, useEffect } from 'react';
import { format, getDaysInMonth, getDay } from 'date-fns';

// ... (other imports and code)

const DaysInMonths = ({ monthIndex, setSelectedDate }) => {
    const [month, setMonth] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());
  
    useEffect(() => {
      const liveDate = new Date();
      const newMonth = new Date(liveDate.getFullYear(), monthIndex, 1);
  
      // Check if the new month is a valid date
      if (!isNaN(newMonth.getTime())) {
        setMonth(newMonth);
        setCurrentDate(liveDate);
      }
    }, [monthIndex]);
  
    const firstDayOfMonth = getDay(month);
    const daysInMonth = getDaysInMonth(month);
  
    const blanks = Array(firstDayOfMonth).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  
    return (
      <div className="days">
        {[...blanks, ...days].map((day, index) => {
          // Compare year, month, and day to check if it's the current date
          const isCurrentDate =
            day === currentDate.getDate() &&
            month.getMonth() === currentDate.getMonth() &&
            month.getFullYear() === currentDate.getFullYear();
  
          const currentDateClass = isCurrentDate ? 'current-date' : '';
  
          return (
            <div
              key={index}
              className={day ? `day ${currentDateClass}` : 'blank'}
              onClick={() => setSelectedDate(`${format(month, 'yyyy-MM')}-${day}`)}
            >
              {day}
            </div>
          );
        })}
      </div>
    );
  };
  
  export default DaysInMonths;
  


