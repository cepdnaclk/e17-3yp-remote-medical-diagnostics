import { Request, Response } from "express";
import { omit } from 'lodash';
import { createDoctor, findOneDoctor } from "../service/doctor.service";
import log from "../logger";

export async function createDoctorHandler(req: Request, res: Response) {
    try {
        const doctor = await createDoctor(req.body);

        return res.status(201).send(omit(doctor.toJSON(), "password"));

    } catch (e: any) {
        log.error(e)
        return res.status(409).send(e.message);
    }

};

export async function getOneDoctorHandler(req: Request, res: Response) {
    try {
        const doctor = await findOneDoctor(req.params.email); //returns {name : Doctor's Name, specialization : Doc's specialization}
        return res.send(doctor?.toJSON());
    } catch (e: any) {
        log.error(e);
        return res.status(400).send(e.message);
    }
}
