import { Card } from "react-bootstrap";
import React from "react";
import Store from "../../store/Store"
import { setStream } from "../../store/globalStates/callState";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/Store";
import { io } from 'socket.io-client';

export interface PatientChatRoomProps {
}

type props = PatientChatRoomProps & PropsFromRedux;
export interface PatientChatRoomState {
    name: String,
    callAccepted: boolean,
    myVideo: MediaStream,
    userVideo: MediaStream,
    callEnded: boolean,
    stream: MediaStream,
    call: { isReceivingCall: boolean, from: String, name: String, }

}

class PatientChatRoom extends React.Component<PatientChatRoomProps, PatientChatRoomState> {

    constructor(props: props) {
        super(props);
        // this.state = {
        // name: '',
        // callAccepted: false,
        // myVideo: null,
        // userVideo: null,
        // callEnded: false,
        // stream: null,
        // call: { isReceivingCall: true, from:'', name: '', }
        const socket = io('http://localhost:5000');
    }

    componentDidMount() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                Store.dispatch(setStream);

                myVideo.current.srcObject = currentStream;
            });

        socket.on('me', (id) => setMe(id));

        socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    }
    render() {
        return (
            <Card>video chat</Card>
        );
    }

}

function mapStateToProps(state: RootState) {
    return {
        isExpanded: !state.sidebar.isCollapsed,
    };
}

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default PatientChatRoom;
