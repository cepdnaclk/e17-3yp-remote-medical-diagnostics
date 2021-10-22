import { FunctionComponent, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { collapse, expand } from "../../store/globalStates/SidebarState";
import { RootState } from "../../store/Store";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  useRouteMatch,
} from "react-router-dom";
import UserProfile from "./profile/UserProfile";
import AccountSettings from "./profile/AccountSettings";
import Notifications from "./profile/Notifications";
import Preferences from "./profile/Preferences";
import PrivacyAndSecurity from "./profile/PrivacyAndSecurity";

interface ProfileProps {}

const Profile: FunctionComponent<ProfileProps> = () => {
  const dispatchRef = useRef(useDispatch());
  useEffect(() => {
    const dispatch = dispatchRef.current;
    // on mount - collapse the sidebar
    dispatch(collapse());
    // cleanup on unmount - expand the sidebar
    return () => {
      dispatch(expand());
    };
  }, [dispatchRef]);

  const user = useSelector((state: RootState) => state.user);
  let { path, url } = useRouteMatch();
  return (
    <Container className="mt-5 mb-auto">
      <Row className="mt-5">
        <BrowserRouter>
          <Col md="auto">
            <Card border="secondary" className="p-3 shadow-sm">
              <Nav defaultActiveKey="/home" className="flex-column">
                <Nav.Link as={NavLink} to={url}>
                  User Profile
                </Nav.Link>
                <Nav.Link as={NavLink} to={`${url}/account`}>
                  Account Settings
                </Nav.Link>
                <Nav.Link as={NavLink} to={`${url}/privacy`}>
                  Privacy and security
                </Nav.Link>
                <Nav.Link as={NavLink} to={`${url}/notifications`}>
                  Notifications
                </Nav.Link>
                <Nav.Link as={NavLink} to={`${url}/preferences`}>
                  Preferences
                </Nav.Link>
              </Nav>
            </Card>
          </Col>
          <Col>
            <Row className="pe-3">
              <Card className="d-flex flex-row align-items-center p-4 shadow-sm">
                <img
                  src="/fallbackProfilePic.jpg"
                  alt=""
                  className="rounded-circle d-inline-block"
                  width="200"
                  height="200"
                />
                <h1 className="ms-5 me-auto">{user.firstName}</h1>
                <Button className="align-self-start" variant="outline-dark">
                  Edit Profile
                </Button>
              </Card>
            </Row>
            <Row className="pe-3 mt-2 flex-grow-1">
              <Switch>
                <Route exact path={`${path}/`} component={UserProfile} />
                <Route path={`${path}/account`} component={AccountSettings} />
                <Route
                  path={`${path}/notifications`}
                  component={Notifications}
                />
                <Route path={`${path}/preferences`} component={Preferences} />
                <Route
                  path={`${path}/privacy`}
                  component={PrivacyAndSecurity}
                />
              </Switch>
            </Row>
          </Col>
        </BrowserRouter>
      </Row>
    </Container>
  );
};

export default Profile;
