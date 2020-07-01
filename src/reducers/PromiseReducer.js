export default function promiseReducer(state, { type, key, ...action }) {
  if (!state) {
    return {};
  }
  if (type === "PROMISE") {
    return { ...state, [key]: action };
  }
  if (type === "AUTH_LOGOUT") {
    return {};
  }
  return state;
}
