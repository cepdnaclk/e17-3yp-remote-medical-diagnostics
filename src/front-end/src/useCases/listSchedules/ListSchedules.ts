import client from "../../httpClient";



/**
 * Registers a new doctor to the system
 * @returns a 200 axios response
 */
export const listSchedules = async () => {
    try {
        const response = await client.get("/schedules");
        return response.data;
    } catch (error) {
        throw error;
    }
};