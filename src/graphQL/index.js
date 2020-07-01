export const getGQL = async (headers = {}, query = "", variables = {}) => {
  try {
    const result = await fetch("http://chat.fs.a-level.com.ua/graphql", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

    return result;
  } catch (error) {
    return new Error("getGQL Error");
  }
};
