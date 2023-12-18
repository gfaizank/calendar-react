import React, { useState, useEffect } from 'react';
 import Month from './Month';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
 import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

 const LiveDateDisplay = ({ openEventModal }) => {
   const [liveDate, setLiveDate] = useState(new Date());

   useEffect(() => {
    const intervalId = setInterval(() => {
      setLiveDate(new Date());
    }, 1000);
     return () => clearInterval(intervalId);
   }, []);

   return (
     <div className="live-date-display">
       <div className="day-name">
         <h2>Custom Scrollable 12-Month Calendar</h2>
       </div>
       <div className="day-name" onClick={() => openEventModal(liveDate)}>
         <div>Live Date: {liveDate.toLocaleString()}</div>
       </div>
     </div>
   );
 };

 const Calendar = () => {
   const totalMonths = 12;
   const monthsToShow = 6;
   const [selectedDate, setSelectedDate] = useState(null);
   const [centerMonthIndex, setCenterMonthIndex] = useState(0);
   const [events, setEvents] = useState([]);

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
       <div className="navbar">
         {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, index) => (
           <div key={index} className="day-name">
             {dayName}
           </div>
         ))}
       </div>
       <div className="scroll-container">
         {[...Array(totalMonths)].map((_, index) => (
           <div key={index} onClick={() => handleMonthClick((centerMonthIndex + index - monthsToShow) % totalMonths)}>
             <Month
               monthIndex={(centerMonthIndex + index - monthsToShow) % totalMonths}
               setSelectedDate={setSelectedDate}
               events={events}
             />
           </div>
         ))}
      </div>
      {selectedDate && <div>Selected Date: {selectedDate}</div>}
    </div>
  );
};
export default Calendar;