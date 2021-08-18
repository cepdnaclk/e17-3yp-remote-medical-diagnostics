import mongoose from "mongoose";
import { ObjectId } from "bson";//mongodb datatype

export interface ScheduleDocument extends mongoose.Document {
    startTime: Date,
    endTime: Date,
    doctor: ObjectId,
    appointments: Array<ObjectId>,
    createdAt: Date,
    updatedAt: Date,
}

const ScheduleSchema = new mongoose.Schema({
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    doctor: { type: ObjectId, required: true },
    appointments: { type: [ObjectId], required: true },
},
    { timestamps: true }
);

const Schedule = mongoose.model<ScheduleDocument>("Schedule", ScheduleSchema);

export default Schedule;