import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import PatientMetaComponent from "./PatientMetaComponent";
import PatientAppointmentsChatRoom from "./patient/PatientChatRoom";

interface HomeSelectorProps {}

const HomeSelector: FunctionComponent<HomeSelectorProps> = () => {
  const type = useSelector((state: RootState) => state.user.type);
  return type === "patient" ? (
    <PatientMetaComponent />
  ) : (
    // <DoctorMetaComponent/>
    <PatientAppointmentsChatRoom />
  );
};

export default HomeSelector;
