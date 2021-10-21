import mongoose from "mongoose";
import { ObjectId } from "bson";//mongodb datatype

export interface AppointmentDocument extends mongoose.Document {
    scheduleId: ObjectId,
    doctorName: string,
    doctorSpeciality: string,
    paid: boolean,
    patient: String, //patient's email
    date: string, //session date
    time: string, //session starting time
    createdAt: Date,
    updatedAt: Date,
}

const AppointmentSchema = new mongoose.Schema({
    schedule: { type: ObjectId, required: true },
    doctorName: { type: String, required: true },
    doctorSpeciality: { type: String, required: true },
    paid: { type: Boolean, required: false },
    patient: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
},
    { timestamps: true }
);

const Appointment = mongoose.model<AppointmentDocument>("Appointment", AppointmentSchema);

export default Appointment;