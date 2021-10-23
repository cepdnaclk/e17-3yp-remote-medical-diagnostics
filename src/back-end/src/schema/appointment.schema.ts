import { object, string, boolean } from "yup";


// scheduleId: ObjectId,
// paid: boolean,
// patientId: ObjectId,
// createdAt: Date,
// updatedAt: Date,

export const createAppointmentSchema = object({
    body: object({
        scheduleID: string().required("Schedule ID required"), //TODO:change string to ObjectID
        paid: boolean().required(), //initially false
        patientID: string().required("PatientID required"), //TODO: change string to ObjectID
    }),
});
