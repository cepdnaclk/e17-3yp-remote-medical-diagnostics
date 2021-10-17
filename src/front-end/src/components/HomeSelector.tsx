import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import PatientMetaComponent from "./PatientMetaComponent";
import DoctorMetaComponent from "./DoctorMetaComponent";
import AdminMeta from "./AdminMetaComponent";

interface HomeSelectorProps {}

const HomeSelector: FunctionComponent<HomeSelectorProps> = () => {
  const type = useSelector((state: RootState) => state.user.type);
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
};

export default HomeSelector;
