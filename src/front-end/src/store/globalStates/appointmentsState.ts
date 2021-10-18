import { createSlice } from '@reduxjs/toolkit'

let lastIndex = 0;

const initialState: appointment[] = [{
  "id": 1,
  "description": {
    "doctor": "Dr.Geller",
    "email": "doctor@mail.com",
    "Specialty": "Dentist",
    "Date": "2019-09-09",
    "Time": "5PM",
    "paid": "true"
  }
}];

interface appointment {
  "id": number,
  "description": {
    "doctor": string,
    "email": string,
    "Specialty": string,
    "Date": string,
    "Time": string,
    "paid": string
  }
}

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    appointmentsFetched: (appointments, action) => {
      appointments.push({
        id: ++lastIndex,
        description: action.payload.description
      })
    }
  }
})

export const { appointmentsFetched } = appointmentsSlice.actions
export const { reducer } = appointmentsSlice;