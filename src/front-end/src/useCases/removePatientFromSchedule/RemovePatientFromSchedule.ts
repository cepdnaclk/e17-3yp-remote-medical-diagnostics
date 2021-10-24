import client from "../../httpClient";

export const removePatientFromSchedule = async (schedule_Id: string, patient: string) => {
    try {
        return await client.put("/schedules/removePatient/" + schedule_Id, null, { params: { patient: patient } })
    } catch (error) {
        throw error;
    }
}