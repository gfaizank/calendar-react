import React, { useState } from 'react';
import Calendar from './components/Calendar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function App() {
  return (
    <div className="App">
      <h2>
        Scroll Down <FontAwesomeIcon icon={faChevronDown} />
      </h2>
      <Calendar />
    </div>
  );
}

export default App;
