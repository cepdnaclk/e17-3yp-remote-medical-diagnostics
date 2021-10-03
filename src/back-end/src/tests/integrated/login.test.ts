import request from "supertest";
import getApp from "../../app";
import { Express } from "express";
import { disconnect } from "../../db/connect";
import patientModel from "../../model/patient.model";
import doctorModel from "../../model/doctor.model";

jest.setTimeout(10000);

describe("Login related tests", () => {
  let app: Express;
  const email = "test@uaudith.com";
  const password = "somePasswordJustToTest";
  beforeAll(async () => {
    app = await getApp();
  });
  afterAll(async () => {
    await disconnect();
  });
  const userInfo = {
    name: "udith",
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
    it("Create a new account", async () => {
      const res = await request(app).post("/api/newPatient").send(userInfo);
      expect(res.status).toBe(200);
    });
    it("Login to the new account and then call /me endpoint with the token", async () => {
      const res = await request(app)
        .post("/api/login/patient")
        .set("User-Agent", "Test Runner")
        .send({
          email,
          password,
        });
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");

      const accessToken = res.body.accessToken;
      const res2 = await request(app)
        .get("/api/me")
        .set("Authorization", `bearer ${accessToken}`);
      expect(res2.body).toHaveProperty("email", email);
      expect(res2.body).toHaveProperty("type", "patient");

      const res3 = await request(app).post("/api/logout").send({
        refreshToken: res.body.refreshToken,
      });
      expect(res3.status).toBe(200);
    });
  });

  describe("For the doctor", () => {
    afterAll(async () => {
      await doctorModel.remove({ email }).exec();
    });
    it("Create a new account", async () => {
      const res = await request(app)
        .post("/api/newDoctor")
        .send({
          ...userInfo,
          license: "someStringForTheLicense",
          isAvailable: "yes",
        });
      expect(res.status).toBe(200);
    });
    it("Login to the new account and then call /me endpoint with the token", async () => {
      const res = await request(app)
        .post("/api/login/doctor")
        .set("User-Agent", "Test Runner")
        .send({
          email,
          password,
        });
      expect(res.body).toHaveProperty("accessToken");
      expect(res.body).toHaveProperty("refreshToken");

      const accessToken = res.body.accessToken;
      const res2 = await request(app)
        .get("/api/me")
        .set("Authorization", `bearer ${accessToken}`);
      expect(res2.body).toHaveProperty("email", email);
      expect(res2.body).toHaveProperty("type", "doctor");

      const res3 = await request(app).post("/api/logout").send({
        refreshToken: res.body.refreshToken,
      });
      expect(res3.status).toBe(200);
    });
  });
});
