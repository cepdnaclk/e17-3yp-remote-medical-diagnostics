import client from "../../httpClient";

interface appointmentData {
    scheduleId: string; //ObjectID
    doctorName: string,
    doctorSpeciality: string,
    paid: boolean,
    patient: String, //patient's email
    date: string, //session date
    time: string, //session starting time
}

/**
 * Registers a new doctor to the system
 * @param data of type `appointmentData`
 * @returns a 200 axios response
 */
export const makeAppointment = async (data: appointmentData) => {
    try {
        return await client.post("/newAppointment", data);
    } catch (error) {
        throw error;
    }
};