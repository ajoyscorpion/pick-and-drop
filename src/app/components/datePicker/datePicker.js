"use client"
import React, { useContext } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { dateTimeContext } from '../../../../context/dateTimeContext';

function DatePickerComponent({selectedDateTime}) {

    const {setSelectedDateTime} = useContext(dateTimeContext);

    const handleDateTimeChange = (dateTime) => {
        setSelectedDateTime(dateTime);
    };

    const currentDate = new Date();

  return (
    <div>
        <DatePicker
            selected={selectedDateTime}
            onChange={handleDateTimeChange}
            dateFormat="MMMM d, yyyy" // Adjust the date format as needed
            showTimeSelect
            timeFormat="h:mm aa"
            timeIntervals={15}
            timeCaption="Time"
            minDate={currentDate}
            inline
        />
        <p className="mt-3">Selected Date: {selectedDateTime ? selectedDateTime.toDateString() : ""}</p>
        <p>Selected Time: {selectedDateTime ? selectedDateTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }) : ""}</p>
    </div>
  )
}

export default DatePickerComponent