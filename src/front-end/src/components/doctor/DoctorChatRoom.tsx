import { Card } from "react-bootstrap";
import React from "react";

export interface DoctorChatRoomProps {}

export interface DoctorChatRoomState {}

class DoctorChatRoom extends React.Component<
  DoctorChatRoomProps,
  DoctorChatRoomState
> {
  state = {};
  render() {
    return <Card>video chat</Card>;
  }
}

export default DoctorChatRoom;
