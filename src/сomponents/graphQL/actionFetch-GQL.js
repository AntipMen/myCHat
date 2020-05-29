const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());

export let GQL = getGQL("http://chat.fs.a-level.com.ua/graphql", {
  Authorization: "Bearer " + localStorage.authToken,
});

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
