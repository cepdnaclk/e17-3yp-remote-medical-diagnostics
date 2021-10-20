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
