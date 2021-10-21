import { FunctionComponent } from "react";
import Card from "react-bootstrap/Card";

interface NotificationsProps {}

const Notifications: FunctionComponent<NotificationsProps> = () => {
  return <Card className="mb-auto p-4">Notifications</Card>;
};

export default Notifications;
