import client from "../../httpClient";

/**
 * Fetches all appointments made by a patient
 * @param - patient : email
 * @returns a 200 axios response
 */

export const getAppointmentsOfUser = async (patient: string) => {
    try {
        const response = await client.get("/appointments/" + patient);
        return response.data;
    } catch (error) {
        throw error;
    }
}