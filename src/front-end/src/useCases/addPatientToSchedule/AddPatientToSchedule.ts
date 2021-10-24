import client from "../../httpClient";



export const addPatientToSchedule = async (scheduleId: string, patient: string) => {
    try {
        return await client.put("/schedules/" + scheduleId, null, { params: { patient: patient } })
    } catch (error) {
        throw error;
    }
}