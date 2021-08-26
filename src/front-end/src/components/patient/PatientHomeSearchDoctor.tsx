import React from 'react';
import "../../App.css"
import{ReactComponent as SearchIcon} from "../../icons/search.svg"
import{ReactComponent as Calendar} from "../../icons/calendar.svg"
import{ReactComponent as Globe} from "../../icons/globe.svg"
import{ReactComponent as Specialization} from "../../icons/specialization.svg"
import{ReactComponent as Person} from "../../icons/person.svg"
import { isCallSignatureDeclaration } from 'typescript';

const PatientHomeSearchDoctor = () => {
    return (
        <div className='find-a-doctor'> Find a Doctor
            <form>
                <label className="find-a-doctor-input-field">
                &nbsp;&nbsp;<Person />&nbsp;&nbsp;
                <input
                    type="text"
                    placeholder="Name"
                    className="find-a-doctor-input"
                />
                </label>

                <label className="find-a-doctor-input-field">
                &nbsp;&nbsp;<Specialization />&nbsp;&nbsp;
                <select className="find-a-doctor-input">
                    <option value="general-practitioner">General Practitioner</option>
                    <option value="lime">Lime</option>
                    <option value="coconut">Coconut</option>
                    <option value="mango">Mango</option>
                </select>
                </label>

                <label className="find-a-doctor-input-field">
                &nbsp;&nbsp;<Globe />&nbsp;&nbsp;
                <select className="find-a-doctor-input">
                    <option value="sinhala">සිංහල​​</option>
                    <option value="tamil">தமிழ்</option>
                    <option value="english">English</option>
                </select>
                </label>

                <label className="find-a-doctor-input-field">
                &nbsp;&nbsp;<Calendar />&nbsp;&nbsp;
                <input
                    type="datetime-local"
                    placeholder="Date and Time"
                    className="find-a-doctor-input"
                />
                </label>
                

                <button className="find-a-doctor-button">
                    <SearchIcon />&nbsp; Search 
                </button>

            </form>
        </div>
    );
}

export default PatientHomeSearchDoctor