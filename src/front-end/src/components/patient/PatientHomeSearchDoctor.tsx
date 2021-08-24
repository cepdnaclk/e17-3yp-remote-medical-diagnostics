import React from 'react';
import "../../App.css"
// import { } from '@fortawesome/free-solid-svg-icons'

const PatientHomeSearchDoctor = () => {
    return (
        <div className='find-a-doctor'> Find a Doctor
            <input
                type="text"
                placeholder="Name"
                className="find-a-doctor-input"
            />

            <input
                type="text"
                placeholder="Speciality"
                className="find-a-doctor-input"
            />
            <input
                type="text"
                placeholder="Language"
                className="find-a-doctor-input"
            />
            <input
                type="text"
                placeholder="Date and Time"
                className="find-a-doctor-input"
            />

            <button className="find-a-doctor-button">
                Search
            </button>
        </div>
    );
}

export default PatientHomeSearchDoctor