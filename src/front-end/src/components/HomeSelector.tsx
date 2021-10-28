import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";
import { Suspense, lazy } from "react";

const Patient = lazy(() => import("./PatientMetaComponent"));
const Doctor = lazy(() => import("./DoctorMetaComponent"));
const Admin = lazy(() => import("./AdminMetaComponent"));

interface HomeSelectorProps {}

const HomeSelector: FunctionComponent<HomeSelectorProps> = () => {
  const type = useSelector((state: RootState) => state.user.type);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {type === "patient" ? (
        <Patient />
      ) : type === "doctor" ? (
        <Doctor />
      ) : type === "admin" ? (
        <Admin />
      ) : (
        <Patient />
      )}
    </Suspense>
  );
};

export default HomeSelector;
