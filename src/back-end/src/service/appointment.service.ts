import { DocumentDefinition } from "mongoose";
import Appointment, { AppointmentDocument } from "../model/appointment.model";


export async function createAppointment(input: DocumentDefinition<AppointmentDocument>) {
    try {
        return await Appointment.create(input);
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function getAppointmentsOfUser(patient: AppointmentDocument["patient"]) {
    try {
        return await Appointment.find({ patient }, "_id scheduleId doctor doctorName doctorSpeciality patient date time paid")
    }
    catch (error: any) {
        throw new Error(error);
    }
}

export async function deleteAppointment(appointment_id: string) {
    try {
        return await Appointment.deleteOne({ _id: appointment_id })
    } catch (error: any) {
        throw new Error(error);
    }
}