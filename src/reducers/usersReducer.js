export default function usersReducer(state, { type, users, avatar }) {
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
    var usersWithLogin = { ...allusers };
    Object.values(usersWithLogin)
      .filter((usersId) => usersId.login.length <= 0)
      .map((index) => delete usersWithLogin[index._id]);
    return { ...state, ...usersWithLogin };
  }
  if (type === "USER_CHANGE") {
    let changeUser = Object.values(state).find(
      (user) => user._id === avatar._id
    );
    let infoUser =
      changeUser !== null && changeUser !== undefined
        ? (changeUser.avatar = avatar.avatar)
        : null;

    return { ...state };
  }
  if (type === "AUTH_LOGOUT") {
    return {};
  }

  return state;
}
