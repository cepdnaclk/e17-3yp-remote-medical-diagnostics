export function markPopupAsShown() {
  localStorage.setItem("medicalDevicePopupShown", "1");
}
export function hasPopupAlreadyShown() {
  return localStorage.getItem("medicalDevicePopupShown");
}
