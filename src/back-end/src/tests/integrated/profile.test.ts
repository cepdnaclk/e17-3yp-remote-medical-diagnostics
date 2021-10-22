import request from "supertest";
import getApp from "../../app";
import { Express } from "express";
import { disconnect } from "../../db/connect";
import patientModel from "../../model/patient.model";
import doctorModel from "../../model/doctor.model";
import { getPatientProfileDetails } from "../../service/getPatientProfileDetails";
import { getDoctorProfileDetails } from "../../service/getDoctorProfileDetails";

jest.setTimeout(10000);

describe("Profile related tests", () => {
  let app: Express;
  const email = "test.profile@uaudith.com";
  const password = "somePasswordJustToTest";
  beforeAll(async () => {
    app = await getApp();
  });
  afterAll(async () => {
    await disconnect();
  });

  const userInfo = {
    name: "uaudith",
    password,
    passwordConfirmation: password,
    email,
    age: "23",
    gender: "M",
    mobileNo: "1234567890",
  };

  describe("For the patient", () => {
    afterAll(async () => {
      await patientModel.remove({ email }).exec();
    });
    beforeAll(async () => {
      await patientModel.create(userInfo);
    });
    it("Should give correct details for profile endpoint", async () => {
      const profile = await getPatientProfileDetails(email);
      expect(profile).toHaveProperty("name", userInfo.name);
      expect(profile).toHaveProperty("mobileNo", userInfo.mobileNo);
    });
  });

  describe("For the Doctor", () => {
    const license = "someStringForTheLicense";
    afterAll(async () => {
      await doctorModel.remove({ email }).exec();
    });
    beforeAll(async () => {
      await doctorModel.create({
        ...userInfo,
        license,
        isAvailable: "yes",
      });
    });
    it("Should give correct details for profile endpoint", async () => {
      const profile = await getDoctorProfileDetails(email);
      expect(profile).toHaveProperty("name", userInfo.name);
      expect(profile).toHaveProperty("license", license);
    });
  });
});
