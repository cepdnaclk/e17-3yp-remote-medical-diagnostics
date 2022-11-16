import mqtt from "mqtt";
import Config from "../config/default";

const client = mqtt.connect(Config.MQTT_BROKER_URL, {
  username: Config.MQTT_USERNAME,
  password: Config.MQTT_PASSWORD,
});

client.on("connect", function () {
  console.log("Back-end connected with mqtt broker");
});

const handlers: { [id: string]: (message: string) => void } = {};

export function add_listener(
  topic: string,
  handler: (message: string) => void
) {
  handlers[topic] = handler;
}

client.on("message", function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  if (topic in handlers) {
    const fun = handlers[topic];
    fun(message.toString());
  }
});

export default client;
