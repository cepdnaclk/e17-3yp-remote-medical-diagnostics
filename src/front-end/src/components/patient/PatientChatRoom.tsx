import React, { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../../store/Store"
import { connect, ConnectedProps } from "react-redux";
import { io } from 'socket.io-client';
import { answerCall, setMe, setCallName, setCall, Call, setStream, endCall } from '../../store/globalStates/callState';
import { Grid, Typography, Paper, Button } from '@material-ui/core';
import Peer from 'simple-peer';

export interface PatientChatRoomProps {
}

type props = PatientChatRoomProps & PropsFromRedux;

export interface PatientChatRoomState {
}
class PatientChatRoom extends React.Component<props, PatientChatRoomState> {
    constructor(props: props) {
        super(props);
    }
    socket = io(); //host must be specified if the backend is at a different address

    myVideo: (MediaStream | undefined) = undefined;
    callerVideo: (MediaStream | undefined) = undefined;
    mySource: string = "";
    callerSource: string = "";


    setMyVideo = (myStream: MediaStream) => {
        console.log("my stream object" + myStream);
        this.mySource = window.URL.createObjectURL(myStream);
        this.myVideo = myStream;
    }

    setCallerVideo = (callerStream: MediaStream) => {
        this.callerSource = window.URL.createObjectURL(callerStream)
        this.callerVideo = callerStream;
    }

    componentDidMount() {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((currentStream) => {
                console.log("user media fetched");
                this.setMyVideo(currentStream);
            });


        this.socket.on('me', (id) => setMe(id));


        this.socket.on('callUser', ({ from, name: callerName, signal }) => {
            setCall({ isReceivingCall: true, from, name: callerName, signal });
        });
    };

    answerCall = () => {
        this.props.answerCall();

        const peer = new Peer({ initiator: false, trickle: false, stream: this.callerVideo });

        peer.on('signal', (data) => {
            this.socket.emit('answerCall', { signal: data, to: this.props.call.from });
        });

        peer.on('stream', (currentStream) => {
            this.setCallerVideo(currentStream);
        });

        peer.signal(this.props.call.signal);

    };


    leaveCall = () => {
        this.props.endCall();

        window.location.reload();
    };

    render() {
        return (
            <div>
                <Grid container >
                    {this.props.stream && (
                        <Paper >
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" gutterBottom>{this.props.name || 'Name'}</Typography>

                            </Grid>
                        </Paper>
                    )}
                    {
                        <Paper >
                            <Grid item xs={12} md={6}>
                                <Typography variant="h5" gutterBottom>{this.props.name || 'Name'}</Typography>
                                <video id="myVideo" src={this.mySource} autoPlay />
                            </Grid>
                        </Paper>
                    }
                </Grid>
            </div>
        );
    }

}


function mapStateToProps(state: RootState) {
    return {
        callAccepted: state.calls.callAccepted,
        callEnded: state.calls.callEnded,
        name: state.calls.name,
        call: state.calls.call,
        stream: state.calls.stream,
        me: state.calls.call
    };
}

function mapDispatchToProps(dispatch: AppDispatch) {
    return {
        answerCall: () => dispatch(answerCall()),
        setMe: (id: String) => dispatch(setMe(id)),
        setCallName: (callName: String) => setCallName(callName),
        setStream: (stream: boolean) => setStream(stream),
        setCall: (call: Call) => setCall(call),
        endCall: () => endCall(),
    };
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;
export default connector(PatientChatRoom);
