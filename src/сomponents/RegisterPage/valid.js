import React from "react";
import { connect } from "react-redux";

import { actionInvalidLogin, actionInvalidPassword } from "../../actions";

const InvalidMessage = ({ message }) => {
  if (typeof message === "object") {
    message = "";
  }
  return <p>{message}</p>;
};
const InvalidMessageforSignIn = ({ message }) => {
  if (typeof message === "object") {
    message = "";
  }

  return <p style={{ color: "red", margin: "10px" }}>{message}</p>;
};

export const CInvalidMessage = connect((state) => ({ message: state.auth }), {
  onInvalid: actionInvalidPassword,
})(InvalidMessage);

export const CInvalidMessageForSignIn = connect(
  (state) => ({ message: state.auth }),
  { onInvalid: actionInvalidLogin }
)(InvalidMessageforSignIn);
