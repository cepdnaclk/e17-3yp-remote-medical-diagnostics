import { Request, Response } from "express";
import log from "../logger";
import { addPatientToSchedule, createSchedule, getSchedules } from "../service/schedule.servics";

export async function createScheduleHandler(req: Request, res: Response) {
    try {
        const schedule = await createSchedule(req.body);

        return res.send(schedule.toJSON());

    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }

};

export async function getSchedulesHandler(req: Request, res: Response) {
    try {
        const schedules = await getSchedules();
        return res.send(schedules); //an array of schedule documents
    } catch (e: any) {
        log.error(e);
        return res.status(400).send(e.message);
    }
}


//add patient to a schedule
export async function addPatientToScheduleHandler(req: Request, res: Response) {
    try {
        const updatedSchedule = await addPatientToSchedule(req.params.id, req.query.patient);
        return res.send(updatedSchedule);
    }
    catch (e: any) {
        log.error(e);
        return res.status(400).send(e.message);
    }
}