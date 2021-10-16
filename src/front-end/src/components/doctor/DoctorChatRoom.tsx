import { useState, useRef, useEffect } from 'react';
import { Prompt } from 'react-router'
import { useDispatch } from "react-redux";
import { Grid, Typography, TextField, Button } from '@material-ui/core';
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
import client from "../../httpClient";

const DoctorChatRoom = () => {

  const dispatch = useDispatch();
  const profile = useAppSelector((state) => state.patientProfile);
  console.log(profile.email);

  const [callAccepted, setCallAccepted] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(false);
  const [muted, setMuted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [myVideoStream, setMyStream] = useState<MediaStream>();
  const [callerVideoStream, setCallerVideoStream] = useState<MediaStream>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const callerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance>();

  let socketCredentials: { [key: string]: string } = {};

  useEffect(() => {
    dispatch(collapse());
    const fetchProfile = async () => {
      const profileReq = new getProfile(UserType.patient);
      await profileReq.execute();
    };
    // only fetches if there are no current profileDetails
    if (!profile.email) fetchProfile();


    socket.emit('email', { id: socket.id, email: profile.email });

    if (callerVideo.current && callerVideoStream) {
      callerVideo.current.srcObject = callerVideoStream;
    }
    if (blockNavigation) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }

    client.get('/api/socket')
      .then((response) => {
        socketCredentials = response.data;
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })

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

  const leaveCall = () => {
    setBlockNavigation(false);
    setCallEnded(true);
    if (peerRef?.current) peerRef.current.destroy();

    window.location.reload();
  };


  const callUser = (id: string) => {
    // console.log("from call user (socket id)" + socket.id + "(me)" + me)

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
      // console.log("from caller; sending peer signal: (socket.id)" + socket.id);
    });

    peer.on('stream', (currentStream) => {
      // console.log("stream recieved at caller " + callerVideo.current);
      if (callerVideo.current) {
        setCallerVideoStream(currentStream)
        callerVideo.current.srcObject = currentStream;
        // console.log(callerVideo.current.srcObject);
      }
    });

    // console.log("from call user (socket id)" + socket.id + "(me)" + me)

    socket.on('answerCall', (signalData) => {
      peer.signal(signalData);
      setCallAccepted(true);
      dispatch(collapse());
      setBlockNavigation(true);
    });

    peerRef.current = peer;
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
              <Typography variant="h6" gutterBottom>{'Doctor'}</Typography>
              {/* <Button onClick={() => enabledoc()}> turn on camera </Button> */}
              {<video id="myVideo" ref={callerVideo} autoPlay />}
              {/* {console.log("caller video source ")}{console.log(callerVideo.current?.srcObject)}
                        {console.log("caller videoStream state ")}{console.log(callerVideoStream)} */}
            </Grid>
          </Card>
        )}
        <Card >
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>{'You'}</Typography>
            {!camOn ?
              (<Button onClick={() => turnOnCamera()}> <CamOff /> </Button>
              ) : (
                <>
                  <video id="callerVideo" muted ref={myVideo} autoPlay />
                  <Button onClick={() => turnOffCamera()}> <Camera /> </Button>
                  {muted ? <Button onClick={() => toggleAudio()} > <Mute /> </Button> : <Button onClick={() => toggleAudio()} > <Mic /> </Button>}
                </>
              )}
          </Grid>
          <h6>{socket.id}</h6>
          <h6>{profile.email}</h6>
        </Card>
        <Card>
          {console.log(socketCredentials)}
          <h6>{socketCredentials}</h6>
        </Card>
      </Grid >
      <Grid item xs={12} md={6} >
        <Typography gutterBottom variant="h6">Make a call</Typography>
        <TextField label="patient ID" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
        {callAccepted && !callEnded ? (
          <Button variant="contained" color="secondary" onClick={leaveCall} >
            Leave Room
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={() => callUser(idToCall)} >
            Admit
          </Button>
        )}
      </Grid>
    </div >
  );
}

export default DoctorChatRoom;
