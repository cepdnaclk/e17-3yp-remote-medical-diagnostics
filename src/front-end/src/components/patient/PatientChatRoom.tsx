import { useState, useRef, useEffect } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { io } from 'socket.io-client';
import Peer from 'simple-peer';
import { Card } from 'react-bootstrap';

interface CallInterface {
    from: string,
    isReceivingCall: boolean,
    signal: any
}

const socket = io("http://localhost:5000"); //host must be specified if the backend is at a different address

const PatientChatRoom = () => {
    const [callAccepted, setCallAccepted] = useState(false);
    const [camOn, setCamOn] = useState(false);
    const [callEnded, setCallEnded] = useState(false);
    const [idToCall, setIdToCall] = useState('');
    const [myVideoStream, setMyStream] = useState<MediaStream>();
    const [call, setCall] = useState<CallInterface>({
        from: '',
        isReceivingCall: false,
        signal: undefined
    });
    const [me, setMe] = useState('');
    const myVideo = useRef<HTMLVideoElement>(null);
    const callerVideo = useRef<HTMLVideoElement>(null);
    const peerRef = useRef<Peer.Instance>();


    useEffect(() => {

        // socket.on('me', (id: string) => {

        // });

        setMe(socket.id);
        console.log("from useffect: (socket.id)" + socket.id);
        socket.on('callUser', ({ from, signal }) => {
            setCall({ isReceivingCall: true, from: from, signal: signal });
        });
    }, []);

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
            } else {
                track.enabled = false;
            };
        })
    }

    const answerCall = () => {
        setCallAccepted(true);

        const peer = new Peer({
            initiator: false,
            answerOptions: {
                offerToReceiveAudio: false,
                offerToReceiveVideo: false
            },
            trickle: false,
            stream: myVideoStream
        });


        peer.on('signal', (data) => {
            socket.emit('answerCall', { signalData: data, to: call.from });
            console.log("peer signal sent to original caller: " + call.from);
        });

        peer.on('stream', (currentStream) => {
            if (callerVideo?.current) {
                callerVideo.current.srcObject = currentStream;
                console.log("stream recieved at callee: ");
                console.log(callerVideo.current.srcObject);
            }
        });

        peer.signal(call.signal);

        peerRef.current = peer;

    };

    const callUser = (id: string) => {
        console.log("from call user (socket id)" + socket.id + "(me)" + me)

        const peer = new Peer({
            initiator: true,
            offerOptions: {
                offerToReceiveAudio: true,
                offerToReceiveVideo: true
            },
            trickle: false,
            stream: myVideoStream
        });

        peer.on('signal', (data) => {
            socket.emit('callUser', { userToCall: id, signalData: data, from: socket.id });
            console.log("from caller; sending peer signal: (socket.id)" + socket.id);
        });

        peer.on('stream', (currentStream) => {
            if (callerVideo?.current) {
                callerVideo.current.srcObject = currentStream;
                console.log("stream recieved at caller ");
                console.log(callerVideo.current.srcObject);
            }
        });

        console.log("from call user (socket id)" + socket.id + "(me)" + me)

        socket.on('answerCall', (signalData) => {
            console.log('Call accepted');
            setCallAccepted(true);
            peer.signal(signalData);
        });

        peerRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);

        if (peerRef?.current) peerRef.current.destroy();

        window.location.reload();
    };

    return (
        <div>
            <Grid container >
                {callAccepted && (
                    <Card >
                        <Grid item xs={12} md={6}>
                            <Typography variant="h5" gutterBottom>{'Doctor'}</Typography>
                            <video id="callerVideo" ref={callerVideo} autoPlay />

                        </Grid>
                    </Card>
                )}
                <Card >
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{'You'}</Typography>
                        {!camOn ?
                            (<Button onClick={() => turnOnCamera()}> turn on camera </Button>
                            ) : (
                                <>
                                    <video id="myVideo" muted ref={myVideo} autoPlay />
                                    <Button onClick={() => turnOffCamera()}> turn off camera </Button>
                                    <Button onClick={() => toggleAudio()}> mic on/off </Button>
                                </>
                            )}
                    </Grid>
                    {console.log("from component (socket.id)" + socket.id + "(me)" + me)}
                </Card>
            </Grid>
            <Grid item xs={12} md={6} >
                <Typography gutterBottom variant="h6">Make a call</Typography>
                <TextField label="patient ID" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
                {callAccepted && !callEnded ? (
                    <Button variant="contained" color="secondary" fullWidth onClick={leaveCall} >
                        Leave Room
                    </Button>
                ) : (
                    <Button variant="contained" color="primary" fullWidth onClick={() => callUser(idToCall)} >
                        Admit
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
        </div>
    );
}

export default PatientChatRoom;
