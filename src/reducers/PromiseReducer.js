export default function promiseReducer(state, { type, key, ...action }) {
  if (!state) {
    return {};
  }
  if (type === "PROMISE") {
    return { ...state, [key]: action };
  }
  return state;
}

export const actionFetch = (key, promise) => {
  const actionPending = () => {
    return {
      status: "PENDING",
      payload: null,
      error: null,
      type: "PROMISE",
      key,
    };
  };
  const actionResolved = (payload) => {
    return { status: "RESOLVED", payload, error: null, type: "PROMISE", key };
  };
  const actionRejected = (error) => {
    return {
      status: "REJECTED",
      payload: null,
      error: error,
      type: "PROMISE",
      key,
    };
  };
  return async (dispatch) => {
    //возвращаем функцию.
    dispatch(actionPending());
    try {
      let resolved = await promise;
      dispatch(actionResolved(resolved));
      return resolved;
    } catch (error) {
      dispatch(actionRejected(error));
    }
  };
};
