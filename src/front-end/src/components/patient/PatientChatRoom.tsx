import { useState, useRef, useEffect } from 'react';
import { Prompt } from 'react-router'
import { useDispatch } from "react-redux";
import { Grid, Typography, Button } from '@material-ui/core';
import { ReactComponent as Mute } from "../../icons/mic-mute.svg";
import { ReactComponent as Mic } from "../../icons/mic.svg";
import { ReactComponent as Camera } from "../../icons/camera-video.svg";
import { ReactComponent as CamOff } from "../../icons/camera-video-off.svg";
import Peer from 'simple-peer';
import { Card } from 'react-bootstrap';
import { collapse } from '../../store/globalStates/SidebarState';
import { useAppSelector } from '../../store/Store';
import getProfile from "../../useCases/getProfile/getProfile";
import UserType from "../../model/userType";
import { socket } from "../../socket";

interface CallInterface {
    from: string,
    isReceivingCall: boolean,
    signal: any
}

const PatientChatRoom = () => {

    const dispatch = useDispatch();
    const profile = useAppSelector((state) => state.patientProfile);

    const [callAccepted, setCallAccepted] = useState(false);
    const [camOn, setCamOn] = useState(false);
    const [blockNavigation, setBlockNavigation] = useState(false);
    const [muted, setMuted] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [myVideoStream, setMyStream] = useState<MediaStream>();
    const [callerVideoStream, setCallerVideoStream] = useState<MediaStream>();
    const [call, setCall] = useState<CallInterface>({
        from: '',
        isReceivingCall: false,
        signal: undefined
    });
    const myVideo = useRef<HTMLVideoElement>(null);
    const callerVideo = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer.Instance>();

    useEffect(() => {
        dispatch(collapse());

        const fetchProfile = async () => {
            const profileReq = new getProfile(UserType.patient);
            await profileReq.execute();
        };
        // only fetches if there are no current profileDetails
        if (!profile.email) fetchProfile();


        socket.emit('email', { id: socket.id, email: profile.email });


        socket.on('callUser', ({ from, signal }) => {
            setCall({ isReceivingCall: true, from: from, signal: signal });
        });
        socket.on('callEnded', () => {
            leaveCall();
        });
        if (callerVideo.current && callerVideoStream) {
            callerVideo.current.srcObject = callerVideoStream;
        }
        if (blockNavigation) {
            window.onbeforeunload = () => true;
        } else {
            window.onbeforeunload = null;
        }
    }, [callerVideoStream, blockNavigation, profile]);

    const turnOnCamera = () => {
        setCamOn(true);
        try {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true })
                .then((myStream) => {
                    setMyStream(myStream);

                    if (myVideo.current) {
                        myVideo.current.srcObject = myStream;
                    };
                })
                .catch((err) => {
                    alert(err.message || "please grant permission to access video");
                });
        } catch (error: any) {
            alert("no media devices found !");
        }
    }

    const turnOffCamera = () => {
        setCamOn(false);
        myVideoStream?.getTracks().forEach((track) => {
            track.stop();
        });
    }

    const toggleAudio = () => {
        myVideoStream?.getAudioTracks().forEach((track) => {
            if (track.muted) {
                track.enabled = true;
                setMuted(false);
            } else {
                track.enabled = false;
                setMuted(true);
            };
        })
    }

    const answerCall = () => {
        setCallAccepted(true);
        dispatch(collapse())
        setBlockNavigation(true);

        const peer = new Peer({
            initiator: false,
            answerOptions: {
                offerToReceiveAudio: false,
                offerToReceiveVideo: false
            },
            trickle: false,
            stream: myVideoStream,
            //custom iceServer:
            /* config: {
                iceServers: [
                    {
                        urls: ["turn:<EC2 instance public IP>:3478?transport=tcp"],//replace with turn server IP
                        username: "<USERNAME>",//leave as <USERNAME>
                        credential: "<PASSWORD>",//leave as <PASSWORD>
                    }
                ]
            } */
        });


        peer.on('signal', (data) => {
            socket.emit('answerCall', { signalData: data, to: call.from });
            // console.log("peer signal sent to original caller: " + call.from);
        });

        peer.on('stream', (currentStream) => {
            // console.log("stream recieved at callee: " + callerVideo.current);
            if (callerVideo.current) {
                setCallerVideoStream(currentStream)
                callerVideo.current.srcObject = currentStream;
                // console.log(callerVideo.current.srcObject);
            }
            // setVideoSet(true)
        });

        peer.signal(call.signal);

        peerRef.current = peer;
    };

    const leaveCall = () => {
        setBlockNavigation(false);
        setCallEnded(true);
        if (peerRef?.current) peerRef.current.destroy();

        window.location.reload();
    };

    return (
        <div>
            <Prompt
                when={blockNavigation}
                message='Are you sure you want to leave the room?'
            />
            <Grid container >
                {callAccepted && (
                    <Card >
                        <Grid item xs={12} md={6}>
                            <Card.Title>Doctor</Card.Title>
                            {/* <Button onClick={() => enabledoc()}> turn on camera </Button> */}
                            {<video id="myVideo" ref={callerVideo} autoPlay />}
                            {/* {console.log("caller video source ")}{console.log(callerVideo.current?.srcObject)}
                            {console.log("caller videoStream state ")}{console.log(callerVideoStream)} */}
                        </Grid>
                    </Card>
                )}
                <Card style={{ width: '600px', height: '450px' }} >
                    <Card.Title>You</Card.Title>
                    {!camOn ?
                        (<Button onClick={() => turnOnCamera()}> <CamOff /> </Button>
                        ) : (
                            <div>
                                <video id="callerVideo" muted ref={myVideo} autoPlay />
                                <Button onClick={() => turnOffCamera()}> <Camera /> </Button>
                                {muted ? <Button onClick={() => toggleAudio()} > <Mute /> </Button> : <Button onClick={() => toggleAudio()} > <Mic /> </Button>}
                            </div>
                        )}
                    {/* <h6>{socket.id}</h6> */}
                </Card>
            </Grid >
            <Grid item xs={12} md={6} >
                {callAccepted && !callEnded && (
                    <Button variant="contained" color="secondary" onClick={leaveCall} >
                        Leave Room
                    </Button>
                )}
            </Grid>
            <>
                {call.isReceivingCall && !callAccepted && (
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        <h1>Doctor is inviting you to the room: </h1>
                        <Button variant="contained" color="primary" onClick={answerCall}>
                            Enter
                        </Button>
                    </div>
                )}
            </>
        </div >
    );
}

export default PatientChatRoom;
