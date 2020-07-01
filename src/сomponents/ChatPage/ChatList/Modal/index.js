import React, { useState, useRef } from "react";
import "./index.css";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import {
  PoweroffOutlined,
  CloseOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  actionAuthLogout,
  actionChangeUser,
  actionChangeAvatar,
} from "../../../../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export const Modal = ({ auth, users, avatar, onUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMe = users
    ? Object.values(users).find((user) => user.login === auth)
    : null;
  const valid = avatar === undefined;

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        type="primary"
        icon={<MenuOutlined />}
        style={{ backgroundColor: "#69c0ff" }}
      />
      {isOpen && (
        <div className="modal">
          <div className="close">
            {" "}
            <Button
              type="primary"
              icon={<CloseOutlined />}
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="modal-body">
            <div className="modal-avatar">
              {" "}
              <img
                src={
                  isMe.avatar &&
                  `http://chat.fs.a-level.com.ua/${isMe.avatar.url}`
                }
                width="200px"
                alt="avatar"
              />
            </div>
            <div className="modal-user-info">
              <h1>{isMe.login}</h1>
            </div>
            <div className="modal-navigation">
              <CAvatar />
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                disabled={valid}
                onClick={() => onUser(avatar._id, isMe._id)}
              >
                Change avatar
              </Button>
            </div>
          </div>
          <CLogoutButton className="ant-btn ant-btn-primary">
            <Link to="/">
              <PoweroffOutlined /> Log out
            </Link>
          </CLogoutButton>
        </div>
      )}
    </>
  );
};

const CLogoutButton = connect(
  (state) => ({ disabled: !state.auth.data, style: { height: "50px" } }),
  {
    onClick: actionAuthLogout,
  }
)(Button);

export const CModal = connect(
  (state) => ({
    auth: state.auth.data.sub.login,
    users: state.users,
    avatar: state.message.avatar,
  }),
  { onUser: actionChangeUser, onAvatar: actionChangeUser }
)(Modal);

const AvatarChange = ({ onAvatar }) => {
  const ref = useRef(null);
  return (
    <form
      action="/upload"
      method="post"
      encType="multipart/form-data"
      ref={ref}
      className="form-upload-avatar"
    >
      <input
        type="file"
        name="media"
        onChange={() => onAvatar(ref.current)}
        className="input-upload-avatar"
      />
      <i className="icon-avatar" />
    </form>
  );
};
const CAvatar = connect(null, {
  onAvatar: actionChangeAvatar,
})(AvatarChange);
