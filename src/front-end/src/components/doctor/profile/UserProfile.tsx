import { FunctionComponent, useEffect } from "react";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import getProfile from "../../../useCases/getProfile/getProfile";
import UserType from "../../../model/userType";
import { useAppSelector } from "../../../store/Store";

interface UserProfileProps {}

const UserProfile: FunctionComponent<UserProfileProps> = () => {
  const profileDetails = useAppSelector((state) => state.patientProfile);
  // runs only once on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const profileReq = new getProfile(UserType.doctor);
      await profileReq.execute();
    };
    // only fetches if there are no current profileDetails
    if (!profileDetails.email) fetchProfile();
  }, [profileDetails]);
  return (
    <Card className=" p-4">
      <Stack className="d-flex flex-column" gap={3}>
        <div className="bg-light p-1">
          {"Email: " + (profileDetails?.email || "N/A")}
        </div>
        <div className="bg-light p-1">
          {"Availability: " + (profileDetails?.availability || "N/A")}
        </div>
        <div className="bg-light p-1">
          {"License: " + (profileDetails?.license || "N/A")}
        </div>
        <div className="bg-light p-1">
          {"Mobile : " + (profileDetails?.mobileNo || "N/A")}
        </div>
        <div className="bg-light p-1">
          {"Age: " + (profileDetails?.age || "N/A")}
        </div>
        <div className="bg-light p-1">
          {"Gender: " + (profileDetails?.gender || "N/A")}
        </div>
      </Stack>
    </Card>
  );
};

export default UserProfile;
