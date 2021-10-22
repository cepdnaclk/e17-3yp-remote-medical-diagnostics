import Doctor from "../model/doctor.model";

export async function getDoctorProfileDetails(email: string) {
  const document = await Doctor.findOne(
    { email },
    "name email age gender mobileNo availability license"
  ).exec();
  return {
    name: document?.name,
    email: document?.email,
    age: document?.age,
    gender: document?.gender,
    mobileNo: document?.mobileNo,
    availability: document?.isAvailable,
    license: document?.license,
  };
}
