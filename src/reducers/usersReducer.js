export default function usersReducer(
  state,
  { type, users, avatar, userId, ...action }
) {
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
  if (type === "USER_CHANGE") {
    let changeUser = Object.values(state).find(
      (user) => user._id === avatar._id
    );
    changeUser.avatar = avatar.avatar;
    return { ...state };
  }
  return state;
}
