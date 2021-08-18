import { Request, Response } from "express";
import { omit } from 'lodash';
import { createDoctor } from "../service/doctor.service";
import log from "../logger";

export async function createDoctorHandler(req: Request, res: Response) {
    try {
        const doctor = await createDoctor(req.body);

        return res.send(omit(doctor.toJSON(), "password"));

    } catch (e) {
        log.error(e)
        return res.status(409).send(e.message);
    }

};
