import Patient from "../model/patient.model";

export async function getPatientProfileDetails(email: string) {
  const document = await Patient.findOne(
    { email },
    "name email age gender mobileNo homeAddress"
  ).exec();
  return {
    name: document?.name,
    email: document?.email,
    age: document?.age,
    gender: document?.gender,
    mobileNo: document?.mobileNo,
    homeAddress: document?.homeAddress,
  };
}
