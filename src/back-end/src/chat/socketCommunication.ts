import { Request, Response } from "express";
import { Server } from "socket.io";
import http from "http";
import send_pair_to_device from "../mqtt/send_pair_to_device";
import { add_listener } from "../mqtt/client";
import mqtt_client from "../mqtt/client";

let socketCredentials: { [key: string]: string } = {};
const email_device_mapping: { [key: string]: string } = {};

interface credential {
  id: string;
  email: string;
  doctor: string;
}
export function sendSockCredentials(req: Request, res: Response) {
  res.send({ socketCredentials });
}

export default function createSocketServer(server: http.Server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  io.on("connection", (socket) => {
    socket.emit("me", socket.id);
    console.log("me emmited " + socket.id);

    socket.on("email", (credential: credential) => {
      if (credential.email) socketCredentials[credential.email] = credential.id;
      if (credential.doctor && socketCredentials[credential.doctor]) {
        socket.to(socketCredentials[credential.doctor]).emit("newPatient");
        console.log("newPatient emmited to");
        console.log(socketCredentials[credential.doctor]);
        console.log("\n");
      }

      console.log(`id: ${credential.id} email: ${credential.email}`);
      console.log(socketCredentials);
      console.log("credential added" + "\n");
    });

    socket.on("disconnect", () => {
      for (let key in socketCredentials) {
        if (socketCredentials[key] === String(socket.id)) {
          delete socketCredentials.key;
          console.log(socketCredentials);
          console.log("disconnected" + "\n");
        }
      }
      socket.emit("callEnded");
      console.log("call ended");
    });

    socket.on("callUser", ({ userToCall, signalData, from }) => {
      socket
        .to(userToCall)
        .emit("callUser", { signal: signalData, from: from });
      console.log({ userToCall, from });
    });

    socket.on("answerCall", ({ signalData, to }) => {
      socket.to(to).emit("answerCall", signalData);
      console.log("callAnswered revieved and signal emitted to : " + to);
    });

    socket.on("pair", ({ user_email, device_id }) => {
      // publishes to /medgenie/device_id/pair
      console.log(
        `Received pair request for device id ${device_id} from ${user_email}`
      );
      // add an on confirm mqtt handler
      add_listener(`medgenie/${device_id}/confirm`, (msg) => {
        // emit to the browser, that pairing is successful
        socket.emit("confirm", "connected");
        email_device_mapping[user_email] = device_id;
      });

      //send the pair request to device
      send_pair_to_device(user_email, device_id);
    });

    // when doctor asks for the temperature
    socket.on("temperature", () => {
      console.log("doctor asking for temperature");
      const buf = Buffer.from(JSON.stringify({ state: 1 }));
      mqtt_client.publish(`medgenie/&Iv05T/getTemp`, buf);

      add_listener("medgenie/&Iv05T/temperature", (msg) => {
        // emit to the browser, that pairing is successful
        console.log("new temperature from patient");

        socket.emit("temperature", msg);
      });
    });
  });
}
