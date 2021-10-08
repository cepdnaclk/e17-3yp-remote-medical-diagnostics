import Card from "react-bootstrap/Card";
import React from "react";

export interface PatientChatRoomProps {}

export interface PatientChatRoomState {}

class PatientChatRoom extends React.Component<
  PatientChatRoomProps,
  PatientChatRoomState
> {
  state = {};
  render() {
    return <Card>video chat</Card>;
  }
}

export default PatientChatRoom;
