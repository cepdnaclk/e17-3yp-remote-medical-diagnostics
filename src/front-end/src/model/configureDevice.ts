import { getSocket } from "../socket";
import Store from "../store/Store";


export function markPopupAsShown() {
  localStorage.setItem("medicalDevicePopupShown", "1");
}
export function hasPopupAlreadyShown() {
  return localStorage.getItem("medicalDevicePopupShown");
}

export function setupMedicalDevice(deviceID: string, handleDeviceConnectedStatus: () => void) {
  const socket = getSocket();
  const userProfile = Store.getState();
  const userEmail = userProfile.user.email;


  //send
  socket.emit("pair", { user_email: userEmail, device_id: deviceID });


  //receive -> update the global state after waiting(asynchronously) for button press on the device
  socket.on("confirm", confirmationMessage => {
    if (confirmationMessage === "connected") {
      console.log("socket received confirmation")
      handleDeviceConnectedStatus();
      // Store.dispatch(setDeviceStatus(true));
    }
  })

}
