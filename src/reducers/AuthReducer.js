import * as jwt_decode from "jwt-decode";

export default function authReducer(state, { type, token, message, users }) {
  if (!state) {
    if (!localStorage.authToken) {
      return {};
    } else {
      type = "AUTH_LOGIN";
      token = localStorage.authToken;
    }
  }

  if (type === "AUTH_LOGIN") {
    const jwt = token;
    const data = jwt_decode(jwt);
    localStorage.setItem("authToken", jwt);
    return { jwt: jwt, data: data };
  }

  if (type === "SAVE_USERS") {
    const isMe = users.find((me) => me._id === state.data.sub.id);
    const avatar =
      isMe.avatar !== null && isMe.avatar !== undefined ? isMe.avatar : null;
    return { ...state, avatar };
  }
  if (type === "AUTH_LOGOUT") {
    localStorage.setItem("authToken", "");
    return {};
  }
  if (type === "INVALID_LOGIN") {
    return "Invalid login or password";
  }
  if (type === "INVALID_PASSWORD") {
    return message;
  }
  return state;
}
