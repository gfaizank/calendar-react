import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
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

  return (
    <Router>
      <div className="calendar" onScroll={handleScroll}>
        <LiveDateDisplay />
        <div className="scroll-container">
          {[...Array(totalMonths)].map((_, index) => (
            <Link key={index} to={`/month/${(centerMonthIndex + index - monthsToShow) % totalMonths}`}>
              <Month
                monthIndex={(centerMonthIndex + index - monthsToShow) % totalMonths}
                setSelectedDate={setSelectedDate}
              />
            </Link>
          ))}
        </div>
        {selectedDate && <div>Selected Date: {selectedDate}</div>}
        <Routes>
          <Route
            path="/month/:monthIndex"
            element={<MonthView setSelectedDate={setSelectedDate} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const MonthView = ({ setSelectedDate }) => {
  const { monthIndex } = useParams();
  return <Month monthIndex={parseInt(monthIndex, 10)} setSelectedDate={setSelectedDate} />;
};

export default Calendar;
