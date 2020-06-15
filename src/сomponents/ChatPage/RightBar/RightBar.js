import React from "react";
import "../MessageForm/Header.css";
// import { CMessagesPage } from "../MessageForm/MessageFormRed";

export const RightBar = (props) => {
  // if (!props.warn) {
  //   return null;
  // }
  return (
    <div>
      <div className="block-helper-header">Slider</div>;
    </div>
  );
};

export const Nav = (props) => {
  console.log(props)
  if (!props.warn) {
    return null;
  }
  return(
  <div className="block-helper">-------------------------------------</div>
);
}
export const All = () => (
  <div className="all">
    {/* <RightBar /> */}
    <Nav />
  </div>
);
