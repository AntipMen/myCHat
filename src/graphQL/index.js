const getGQL = (url, headers = {}) => async (query = "", variables = {}) => {
  const result = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  }).then((res) => res.json());
  if (result.errors) throw new Error(result.errors);
  return result;
};

export let GQL = getGQL("http://chat.fs.a-level.com.ua/graphql", {
  Authorization: "Bearer " + localStorage.authToken,
});
