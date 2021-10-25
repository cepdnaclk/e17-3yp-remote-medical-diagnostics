import client from "../../httpClient";

/**
 * Registers a new doctor to the system
 * @param id is the schedule ID 
 * @returns a 200 axios response
 */
export const deleteAppointment = async (id: string) => {
    try {
        return await client.delete("/appointments/" + id);
    } catch (error) {
        throw error;
    }
};