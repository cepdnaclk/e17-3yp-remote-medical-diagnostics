//import { Card } from "react-bootstrap";
import React from "react";
import Signup from "../Signup";

export interface PatientChatRoomProps {}

export interface PatientChatRoomState {}

class PatientChatRoom extends React.Component<
  PatientChatRoomProps,
  PatientChatRoomState
> {
  state = {};
  render() {
    return (
      //<Card>video chat</Card>
      <Signup />
    );
  }
}

export default PatientChatRoom;
