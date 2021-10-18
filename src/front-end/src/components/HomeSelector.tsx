import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import PatientMetaComponent from "./PatientMetaComponent";
import DoctorMetaComponent from "./DoctorMetaComponent";
<<<<<<< HEAD
//import PatientAppointmentsChatRoom from "./patient/PatientChatRoom";
=======
import AdminMeta from "./AdminMetaComponent";
>>>>>>> 6638a23dde521fffe7813fa23623d16ecd1afdde

interface HomeSelectorProps {}

const HomeSelector: FunctionComponent<HomeSelectorProps> = () => {
  const type = useSelector((state: RootState) => state.user.type);
<<<<<<< HEAD
  return type === "patient" ? (
    <PatientMetaComponent />
  ) : (
    <DoctorMetaComponent />
    //<PatientAppointmentsChatRoom />
  );
=======
  switch (type) {
    case "patient":
      return <PatientMetaComponent />;
    case "doctor":
      return <DoctorMetaComponent />;
    case "admin":
      return <AdminMeta />;
    default:
      return <PatientMetaComponent />;
  }
>>>>>>> 6638a23dde521fffe7813fa23623d16ecd1afdde
};

export default HomeSelector;
