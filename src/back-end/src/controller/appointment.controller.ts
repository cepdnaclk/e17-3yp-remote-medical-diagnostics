import { Request, Response } from "express";
import { request } from "http";
import log from "../logger";
import { createAppointment, deleteAppointment, getAppointmentsOfUser } from "../service/appointment.service";

export async function createAppointmentHandler(req: Request, res: Response) {
    try {
        const appointment = await createAppointment(req.body);
        return res.status(201).send(appointment.toJSON());

    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
};


export async function getAppointmentsOfUserHandler(req: Request, res: Response) {
    try {
        const appointment = await getAppointmentsOfUser(req.params.patient);
        return res.send(appointment);
    } catch (e: any) {
        log.error(e);
        return res.send(400).send(e.message);
    }
}

export async function deleteAppointmentHandler(req: Request, res: Response) {
    try {
        const deletedCount = await deleteAppointment(req.params.id);
        return res.send(deletedCount);
    } catch (e: any) {
        log.error(e);
        return res.send(400).send(e.message);
    }
}