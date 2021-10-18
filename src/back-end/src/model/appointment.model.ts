import mongoose from "mongoose";
import { ObjectId } from "bson";//mongodb datatype

export interface AppointmentDocument extends mongoose.Document {
    scheduleId: ObjectId,
    //doctor: ObjectId,
    paid: boolean,
    patientId: ObjectId,
    createdAt: Date,
    updatedAt: Date,
}

const AppointmentSchema = new mongoose.Schema({
    schedule: { type: ObjectId, required: true },
    //doctor: { type: ObjectId, required: true },
    paid: { type: Boolean, required: true },
    patientId: { type: ObjectId, required: true },
},
    { timestamps: true }
);

const Appointment = mongoose.model<AppointmentDocument>("Appointment", AppointmentSchema);

export default Appointment;