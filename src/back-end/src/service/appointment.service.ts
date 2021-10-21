import { DocumentDefinition } from "mongoose";
import Appointment, { AppointmentDocument } from "../model/appointment.model";


export async function createAppointment(input: DocumentDefinition<AppointmentDocument>) {
    try {
        return await Appointment.create(input);
    } catch (error: any) { //TODO: Change this 'any'
        throw new Error(error);
    }
}

export async function getAppointmentsOfUser(patient: AppointmentDocument["patient"]) {
    try {
        return await Appointment.find({ patient }, "-_id doctorName doctorSpeciality date time paid")
    }
    catch (error: any) {
        throw new Error(error);
    }
}