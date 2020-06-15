export default function usersReducer(state, { type, users, ...action }) {
  //debugger;
  if (!state) {
    return {};
  }
  if (type === "SAVE_USERS") {
    var allusers = users
      ? users.reduce((list, mes) => {
          list[mes._id] = mes;
          return list;
        }, {})
      : [];
    return { ...state, ...allusers };
  }
  return state;
}

export const actionSaveUsers = (users) => ({ type: "SAVE_USERS", users });
