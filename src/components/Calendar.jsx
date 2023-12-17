import React, { useState, useEffect } from 'react';
import Month from './Month';

const LiveDateDisplay = () => {
  const [liveDate, setLiveDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div>Live Date: {liveDate.toLocaleString()}</div>;
};

const Calendar = () => {
  const totalMonths = 12;
  const monthsToShow = 6;
  const [selectedDate, setSelectedDate] = useState(null);
  const [centerMonthIndex, setCenterMonthIndex] = useState(0);

  useEffect(() => {
    // Fetch the live date
    const liveDate = new Date();

    // Update the center month based on the live date
    setCenterMonthIndex(liveDate.getMonth());

    // Set the selected date to the live date
    setSelectedDate(`${liveDate.getFullYear()}-${liveDate.getMonth() + 1}-${liveDate.getDate()}`);
  }, []);

  const handleScroll = (e) => {
    // Calculate the current scroll position
    const scrollPosition = e.target.scrollLeft;

    // Calculate the index of the centered month
    const centeredMonthIndex = Math.floor(scrollPosition / (window.innerWidth / totalMonths));

    // Update the center month index
    setCenterMonthIndex(centeredMonthIndex);
  };

  const handleMonthClick = (index) => {
    setSelectedDate(`${new Date().getFullYear()}-${index + 1}-${new Date().getDate()}`);
  };

  return (
    <div className="calendar" onScroll={handleScroll}>
      <LiveDateDisplay />
      <div className="scroll-container">
        {[...Array(totalMonths)].map((_, index) => (
          <div key={index} onClick={() => handleMonthClick((centerMonthIndex + index - monthsToShow) % totalMonths)}>
            <Month
              monthIndex={(centerMonthIndex + index - monthsToShow) % totalMonths}
              setSelectedDate={setSelectedDate}
            />
          </div>
        ))}
      </div>
      {selectedDate && <div>Selected Date: {selectedDate}</div>}
    </div>
  );
};

export default Calendar;
