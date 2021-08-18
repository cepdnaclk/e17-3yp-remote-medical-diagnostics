import { Request, Response } from "express";
import { omit } from 'lodash';
import { createPatient } from "../service/patient.service";
import log from "../logger";

export async function createPatientHandler(req: Request, res: Response) {
    try {
        const patient = await createPatient(req.body);

        return res.send(omit(patient.toJSON(), "password"));

    } catch (e) {
        log.error(e)
        return res.status(409).send(e.message);
    }

};
