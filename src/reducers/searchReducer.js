export const searchReducer = (state, { type, query, result }) => {
  if (!state) return { query: "", result: null };
  if (type === "SEARCH") return { ...state, query };
  if (type === "SEARCH_RESULT") return { ...state, result };
  if (type === "CLEAN_RESULT") return {};

  return state;
};
