export function setToken(token) {
  return localStorage.setItem("jwt", token);
}
export function setId(id) {
  return localStorage.setItem("id", id);
}
export function setIsAdmin(admin) {
  return localStorage.setItem("isAdmin", admin);
}
export function setIsUser(user) {
  return localStorage.setItem("isUser", user);
}
export function isLoggedIn() {
  if (localStorage.getItem("jwt")) {
    return true;
  }
  return false;
}
export function isAdmin() {
  if (localStorage.getItem("isAdmin") === "true") {
    return true;
  }
  return false;
}
