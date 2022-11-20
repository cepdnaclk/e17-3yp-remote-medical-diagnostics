import mqtt_client from "./client";

export default function send_pair_to_device(
  user_email: string,
  device_id: string
) {
  const buf = Buffer.from(JSON.stringify({ state: 1 }));
  mqtt_client.publish(`medgenie/${device_id}/pair`, buf);
}
