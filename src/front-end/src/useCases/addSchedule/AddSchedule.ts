import client from "../../httpClient";

interface scheduleData {
    doctor: string;
    date: string;
    time: string;
    patients: Array<string>;
}

/**
 * Registers a new doctor to the system
 * @param data of type `scheduleData`
 * @returns a 200 axios response
 */
export const addSchedule = async (data: scheduleData) => {
    try {
        return await client.post("/newSchedule", data);
    } catch (error) {
        throw error;
    }
};