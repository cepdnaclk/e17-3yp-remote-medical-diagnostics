import client from "../../httpClient";

interface doctorData {
    name: string;
    email: string;
    age: number;
    gender: string;
    password: string;
    passwordConfirmation: string;
    specialization: string;
    license: string;
    mobileNo: string;
}

/**
 * Registers a new doctor to the system
 * @param data of type `doctorData`
 * @returns a 200 axios response
 */
export const addDoctor = async (data: doctorData) => {
    try {
        return await client.post("/newDoctor", data);
    } catch (error) {
        throw error;
    }
};