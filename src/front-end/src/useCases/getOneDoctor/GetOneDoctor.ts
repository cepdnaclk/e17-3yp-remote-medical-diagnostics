import client from "../../httpClient";



/**
 * Fetches details of a doctor to the system
 * @param - email
 * @returns a 200 axios response
 */
export const getOneDoctor = async (email: string) => {
    try {
        const response = await client.get("/doctors/" + email);
        return response.data; //returns name, specialization
    } catch (error) {
        throw error;
    }
};