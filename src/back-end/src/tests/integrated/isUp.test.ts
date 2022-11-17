import request from "supertest";
import getApp from "../../app";
import { Express } from "express";
import { disconnect } from "../../db/connect";
import { closeMqttConnection } from "../../mqtt/client";

jest.setTimeout(10000);

describe("isUp", () => {
  let app: Express;
  beforeAll(async () => {
    app = await getApp();
  });
  afterAll(async () => {
    await disconnect();
    closeMqttConnection();
  });

  it("should return 200 response", async () => {
    const res = await request(app).get("/isUp");
    expect(res.status).toBe(200);
  });
});
