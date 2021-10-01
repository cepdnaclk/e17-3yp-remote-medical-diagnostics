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
  return (
    <Container className="mt-5 mb-auto">
      <Row className="mt-5">
        <Col md="auto">
          <Card border="secondary" className="p-3 shadow-sm">
            <Nav defaultActiveKey="/home" className="flex-column">
              <Nav.Link>User Profile</Nav.Link>
              <Nav.Link eventKey="link-1">Account Settings</Nav.Link>
              <Nav.Link eventKey="link-2">Privacy and security</Nav.Link>
              <Nav.Link eventKey="link-3">Notifications</Nav.Link>
              <Nav.Link eventKey="link-4">Preferences</Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                Disabled
              </Nav.Link>
            </Nav>
          </Card>
        </Col>
        <Col>
          <Row className="pe-3">
            <Card className="d-flex flex-row align-items-center p-4 shadow-sm">
              <img
                src="https://github.com/uaudith.png"
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
            <Card className="mb-auto p-4">Details</Card>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
