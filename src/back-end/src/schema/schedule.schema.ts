import { object, string, array } from "yup";
// import ObjectIdSchema from "./ObjectIdSchema";

// const ObjectID = () => new ObjectIdSchema();

//     doctor: ObjectId,
//     startTime: Date,
//     endTime: Date,
//     patients: Array<ObjectId>,
//     createdAt: Date,
//     updatedAt: Date,

export const createScheduleSchema = object({
    body: object({
        doctor: string().required("DoctorID required"),//Doctor's email
        date: string().notRequired(),
        time: string().notRequired(),
        patients: array().of(string()).notRequired(), //initially the patients array is empty
    })
})