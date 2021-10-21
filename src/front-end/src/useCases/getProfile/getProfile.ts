import client from "../../httpClient";
import UserType from "../../model/userType";
import { setProfile } from "../../store/globalStates/ProfilePatient";
import Store from "../../store/Store";

export type profileResponse = {
  name: string;
  email: string;
  age: number;
  gender: string;
  mobileNo: string;
  homeAddress?: string;
  availability?: string;
  license?: string;
};

/**
 * Gets the profile data of a user from the /api/{type}/profile
 */
export default class getProfile {
  type: UserType;
  endpoint?: string;
  constructor(type: UserType) {
    this.type = type;
  }

  response?: profileResponse; // data from the backend
  execute = async () => {
    console.log("Getting user profiles");
    if (this.type === UserType.patient) this.endpoint = "/patient/profile";
    else if (this.type === UserType.doctor) this.endpoint = "/doctor/profile";
    if (this.endpoint) {
      try {
        this.response = (await client.get<profileResponse>(this.endpoint)).data;
        if (this.response) Store.dispatch(setProfile(this.response));
      } catch (error) {
        throw error;
      }
    }
    return this.response;
  };
}
