import { getSocket } from "../socket";
import Store from "../store/Store";

export function markPopupAsShown() {
  localStorage.setItem("medicalDevicePopupShown", "1");
}
export function hasPopupAlreadyShown() {
  return localStorage.getItem("medicalDevicePopupShown");
}

export function setupMedicalDevice(deviceID: string) {
  const socket = getSocket();
  const userProfile = Store.getState();
  const userEmail = userProfile.user.email;

  //send
  socket.emit("pair", { userEmail, deviceID });


  //receive
  socket.on("confirm", confirmationMessage => {
    if (confirmationMessage === "connected") {
      return true;
    }
  })

}
