import mongoose from "mongoose";

export interface ScheduleDocument extends mongoose.Document {
    doctor: String, //doctors's email
    startTime: Date,
    endTime: Date,
    patients: Array<string>,
    createdAt: Date,
    updatedAt: Date,
}

const ScheduleSchema = new mongoose.Schema({
    doctor: { type: String, required: true },
    startTime: { type: Date, required: false },
    endTime: { type: Date, required: false },
    patients: { type: [String], required: false },    //intially, patients array is empty
},
    { timestamps: true }
);

const Schedule = mongoose.model<ScheduleDocument>("Schedule", ScheduleSchema);

export default Schedule;