export const searchReducer = (state, { type, query, result }) => {
  //редьюсер, который просто хранит все action в объекте по имени
  if (!state) return { query: "", result: null };
  if (type === "SEARCH") return { ...state, query };
  if (type === "SEARCH_RESULT") return { ...state, result };

  return state;
};
