import mongoose from "mongoose";

export interface ScheduleDocument extends mongoose.Document {
    doctor: string, //doctors's email
    date: string,
    time: string,
    patients: Array<string>,
    createdAt: Date,
    updatedAt: Date,
}

const ScheduleSchema = new mongoose.Schema({
    doctor: { type: String, required: true },
    date: { type: String, required: false },
    time: { type: String, required: false },
    patients: { type: [String], required: false },    //intially, patients array is empty
},
    { timestamps: true }
);

const Schedule = mongoose.model<ScheduleDocument>("Schedule", ScheduleSchema);

export default Schedule;