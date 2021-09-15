import { createSlice } from '@reduxjs/toolkit'

let lastIndex = 0;

const initialState = [{}];

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