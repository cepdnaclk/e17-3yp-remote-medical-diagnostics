import { useState, useRef, useEffect } from 'react';
import { Prompt } from 'react-router'
import { useDispatch } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { ReactComponent as Mute } from "../../icons/mic-mute.svg";
import { ReactComponent as Mic } from "../../icons/mic.svg";
import { ReactComponent as Camera } from "../../icons/camera-video.svg";
import { ReactComponent as CamOff } from "../../icons/camera-video-off.svg";
import Peer from 'simple-peer';
import { Card, Button } from 'react-bootstrap';
import { collapse } from '../../store/globalStates/SidebarState';
import { useAppSelector } from '../../store/Store';
import getProfile from "../../useCases/getProfile/getProfile";
import UserType from "../../model/userType";
import { socket } from "../../socket";
import client from "../../httpClient";
import { TextField } from '@material-ui/core';


const DoctorChatRoom = () => {

  const dispatch = useDispatch();
  const profile = useAppSelector((state) => state.patientProfile);// TODO: chnage to doctor

  const [callAccepted, setCallAccepted] = useState(false);
  const [callingUser, setCallingUser] = useState(false);
  const [sockIdSet, setSockId] = useState(false);
  const [sockIdUpdated, setSockIdUpdated] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [blockNavigation, setBlockNavigation] = useState(false);
  const [muted, setMuted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [myVideoStream, setMyStream] = useState<MediaStream>();
  const [callerVideoStream, setCallerVideoStream] = useState<MediaStream>();

  const myVideo = useRef<HTMLVideoElement>(null);
  const callerVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<Peer.Instance>();

  const socketCredentials = useRef<{ key: string, value: string }[]>([]);

  useEffect(() => {
    dispatch(collapse());
    fetchSocketIds();
    const fetchProfile = async () => {
      const profileReq = new getProfile(UserType.patient);// TODO: chnage to doctor
      await profileReq.execute();
    };
    // only fetches if there are no current profileDetails
    if (!profile.email) fetchProfile();

    socket.emit('email', { id: socket.id, email: "doctor@mail.com" }); // TODO : change email to profile.email

    socket.on('callEnded', () => { console.log("callEnded"); leaveCall(); });

    if (callerVideo.current && callerVideoStream) {
      callerVideo.current.srcObject = callerVideoStream;
    }
    if (blockNavigation) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }

    socket.on('newPatient', () => {
      fetchSocketIds();
    });

  }, [callerVideoStream, blockNavigation, profile, dispatch]);

  const fetchSocketIds = () => {

    client.get('/socket')
      .then((response) => {
        socketCredentials.current = [];
        for (const [key, value] of Object.entries(response.data.socketCredentials)) {
          if (key !== "doctor@mail.com")  // TODO: change condition ;  key !== profile.email
            socketCredentials.current.push({ key: key, value: String(value) });
        }
        console.log("response.data");
        console.log(socketCredentials);
        setSockId(true);
        setSockIdUpdated(false)
      })
      .catch((error) => {
        console.log(error);
        throw error;
      })

  }
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
    setCallingUser(true);
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
    });

    peer.on('stream', (currentStream) => {
      if (callerVideo.current) {
        setCallerVideoStream(currentStream)
        callerVideo.current.srcObject = currentStream;
      }
    });

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
              <Card.Title>Patient</Card.Title>
              {<video id="myVideo" ref={callerVideo} autoPlay />}
            </Grid>
          </Card>
        )}
        <Card style={{ width: '650px', height: '510px' }} >
          <Card.Title>You</Card.Title>
          {!camOn ?
            (<Button style={{ width: '60px', height: '50px' }} className="btn-secondary" onClick={() => turnOnCamera()}> <CamOff /> </Button>
            ) : (
              <Card>
                <Grid>
                  <video id="callerVideo" muted ref={myVideo} autoPlay />
                  <Button style={{ width: '60px', height: '50px' }} className="btn-secondary" onClick={() => turnOffCamera()}> <Camera /> </Button>
                  {muted ?
                    <Button style={{ width: '60px', height: '50px' }} className="btn-secondary" onClick={() => toggleAudio()} > <Mute /> </Button>
                    :
                    <Button style={{ width: '60px', height: '50px' }} className="btn-secondary" onClick={() => toggleAudio()} > <Mic /> </Button>
                  }
                </Grid>
              </Card>
            )}
        </Card>
        {callAccepted && !callEnded &&
          <Card>
            <TextField></TextField>{/* TODO: send prescription*/}
            <Button className="btn btn-primary" >Send</Button>
          </Card>
        }
        {
          sockIdSet && !callAccepted && !sockIdUpdated &&
          <Card>
            <table className="table" style={{ width: "50", margin: 0 }}>
              <thead>
                <tr>
                  <th key="email" scope="col">
                    Email
                  </th>
                </tr>
              </thead>
              <tbody>
                {console.log("from table socketCredentials")}
                {console.log(socketCredentials)}
                {() => { setSockIdUpdated(true) }}
                {socketCredentials.current.map(({ key, value }) => {
                  console.log(`key ${key}: value ${value}`)
                  return (
                    <tr>
                      <td>{key}</td>
                      <td>
                        <Button className="btn btn-primary" onClick={() => callUser(value)} >
                          Admit
                        </Button>
                      </td>
                    </tr>

                  );
                })}
              </tbody>
            </table>
          </Card>
        }
        {callingUser && !callAccepted &&
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <h1>Calling patient ... </h1>
          </div>
        }
      </Grid >
      <Grid item xs={12} md={6} >
        {callAccepted && !callEnded && (
          <Button className="btn btn-danger" onClick={leaveCall} >
            End Call
          </Button>
        )}
      </Grid>
    </div >
  );
}

export default DoctorChatRoom;
