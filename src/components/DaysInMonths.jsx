import React, { useState, useEffect } from 'react';
import { format, getDaysInMonth, getDay, addDays } from 'date-fns';

const DaysInMonths = ({ month: propMonth, setSelectedDate, currentDate, events }) => {
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [displayCurrentDate, setDisplayCurrentDate] = useState(new Date());
  const [eventList, setEventList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteEventIndex, setDeleteEventIndex] = useState(null);
  const [editedDescription, setEditedDescription] = useState('');
  const [editEventIndex, setEditEventIndex] = useState(null);

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

  const handleDayClick = (day) => {
    const date = `${format(displayMonth, 'yyyy-MM')}-${day}`;
    const eventsForDay = eventList.filter((event) => event.date === date);

    if (eventsForDay.length === 0) {
      const eventDescription = window.prompt(`Enter event for ${date}:`);

      if (eventDescription !== null) {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

        const newEvent = {
          date,
          description: eventDescription,
          color: randomColor,
        };

        setEventList((prevEvents) => [...prevEvents, newEvent]);

        // Handle the new event as needed (e.g., update state or make an API call)
        console.log('New Event:', newEvent);
      }
    }
  };

  const handleEdit = (event) => {
    console.log("Existing Event:", event);
    // Check if the existing event is defined before attempting to edit
    if (event !== undefined) {
      setIsModalOpen(true);
      setEditedDescription(event.description);
      const index = eventList.findIndex((e) => e === event);
      setEditEventIndex(index);
      console.log("71", editEventIndex, index, eventList);
    }
  };

  const handleDelete = (event) => {
    const index = eventList.findIndex((e) => e === event);
    setDeleteEventIndex(index);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (deleteEventIndex !== null) {
      const updatedEventList = [...eventList];
      updatedEventList.splice(deleteEventIndex, 1);
      setEventList(updatedEventList);
      setDeleteEventIndex(null);
    }
    closeModal(); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setDeleteEventIndex(null);
  };

  const handleEditEvent = () => {
    console.log("108", editedDescription);
    setEventList((prevEvents) => {
      const updatedEvents = [...prevEvents];
      const index = updatedEvents.findIndex((e) => e.date === eventList[editEventIndex].date);
      if (index !== -1) {
        updatedEvents[index] = {
          ...updatedEvents[index],
          description: editedDescription,
        };
      }
      return updatedEvents;
    });
    closeModal(); // Close the modal after editing
  };

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

        const isCurrentDate =
          day === displayCurrentDate.getDate() &&
          displayMonth.getMonth() === displayCurrentDate.getMonth() &&
          displayMonth.getFullYear() === displayCurrentDate.getFullYear();

        const currentDateClass = isCurrentDate ? 'current-date' : '';
        const dayOfWeekClass = `day-of-week-${weekday}`;

        const eventsForDay = eventList.filter((event) => event.date === `${format(displayMonth, 'yyyy-MM')}-${day}`);

        return (
          <div
            key={index}
            className={`${day} ${currentDateClass} ${dayOfWeekClass}`}
            onClick={() => handleDayClick(day)}
            style={{ color: "#000", background: eventsForDay.length > 0 ? eventsForDay[0].color : 'transparent' }}
          >
            <p className={currentDateClass}>{day}</p>
            {eventsForDay.length > 0 && (
              <div style={{ color: '#f5f5f5', padding: '5px' }}>
                <span><strong onClick={() => handleEdit(eventsForDay[0])}>{eventsForDay[0].description} 🖊️ </strong></span> |
                <span style={{ cursor: 'pointer', color: 'red' }} onClick={() => handleDelete(eventsForDay[0])}>🗑️ Delete</span>
              </div>
            )}
          </div>
        );
      })}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
            <span className="close" onClick={closeModal} style={{ cursor: 'pointer', position: 'absolute', top: '10px', right: '10px', fontSize: '20px' }}>
              &times;
            </span>
            {deleteEventIndex !== null ? (
              // Render delete confirmation
              <>
                <h2>Delete Event</h2>
                <p>Are you sure you want to delete this event?</p>
                <button onClick={handleConfirmDelete} style={{ background: '#f44336', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Confirm Delete</button>
              </>
            ) : (
              // Render edit content
              <>
                <h2>{`Edit Event for ${format(displayMonth, 'yyyy-MM')}-${eventList.length > 0 ? eventList[editEventIndex].date.split('-')[2] : ''}`}</h2>
                <label>Edit Event:</label>
                <input
                  type="text"
                  defaultValue={eventList.length > 0 ? eventList[editEventIndex].description : ''}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button onClick={closeModal} style={{ background: '#008CBA', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', marginRight: '5px' }}>Cancel</button>
                <button onClick={handleEditEvent} style={{ background: '#008CBA', color: '#fff', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DaysInMonths;
