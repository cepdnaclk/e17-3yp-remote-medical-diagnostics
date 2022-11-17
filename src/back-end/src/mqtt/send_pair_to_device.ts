import mqtt_client from "./client";

export default function send_pair_to_device(
  user_email: string,
  device_id: string
) {
  mqtt_client.publish(`medgenie/${device_id}/pair`, user_email);
}
