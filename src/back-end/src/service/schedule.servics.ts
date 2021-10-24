import { DocumentDefinition } from "mongoose";
import Schedule, { ScheduleDocument } from "../model/schedule.model";

export async function createSchedule(input: DocumentDefinition<ScheduleDocument>) {
    try {
        return await Schedule.create(input);
    } catch (error: any) { //TODO: Change this 'any'
        throw new Error(error);
    }
}

//list all the schedules
export async function getSchedules() {
    try {
        return await Schedule.find();

    } catch (error: any) {
        throw new Error(error);
    }
}

//add a patient to the patients list of a schedule
export async function addPatientToSchedule(scheduleId: string, patient: any) {
    try {
        return await Schedule.updateOne({ _id: scheduleId }, { $push: { patients: patient } });
    } catch (error: any) {
        throw new Error(error);
    }
}

//remove a patient from the patient list of a schedule
export async function removePatientFromSchedule(scheduleId: string, patient: any) {
    try {
        return await Schedule.updateOne({ _id: scheduleId }, { $pull: { patients: patient } })
    } catch (error: any) {
        throw new Error(error);
    }
}
