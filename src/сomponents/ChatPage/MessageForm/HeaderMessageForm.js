import React from "react";
import "./Header.css";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { CContactsModal } from "./contactModal";
import { Link } from "react-router-dom";
import { Popover } from "antd";
import { BulbOutlined } from "@ant-design/icons";
import { AvatarColors } from "./messageList/avatars";

const HeaderChat = ({ chats, id, auth }) => {
  var chatId = chats
    ? Object.values(chats).find((chat) => chat._id === id)
    : {};
  let nick = auth.data.sub.login;

  return (
    <>
      {chatId ? (
        <div className="block-chat-header">
          <div className="chat-name">
            <h3>{chatId.title}</h3>

            <Popover
              placement="bottomLeft"
              title={"Members"}
              content={
                <ListMember
                  members={chatId.members}
                  chatOwner={chatId.owner._id}
                />
              }
              trigger="click"
            >
              {chatId.members.length} members
            </Popover>
          </div>
          <div className="button">
            <CContactsModal />
          </div>
        </div>
      ) : (
        <h2>
          <Link to="/mychat" style={{ textDecoration: "none", color: "white" }}>
            Welcome to myChat, {nick}!
          </Link>
        </h2>
      )}{" "}
    </>
  );
};

export const CHeaderChat = connect((state) => ({
  chats: state.chats,
  id: state.router && state.router.match && state.router.match.params._id,
  auth: state.auth,
}))(HeaderChat);

const ListMember = ({ members, chatOwner }) => {
  const { color, colorLighten } = AvatarColors(members[0].login);
  return (
    <div className="user-card">
      {members.map((member) => (
        <>
          <div className="member">
            {member.avatar !== null ? (
              <img
                src={
                  member.avatar &&
                  `http://chat.fs.a-level.com.ua/${member.avatar.url}`
                }
                className="member-avatar"
                alt="avatar"
              />
            ) : (
              <span
                className="circle-min"
                style={{
                  background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
                }}
              >
                <h1>{member.login.slice(0, 1)}</h1>
              </span>
            )}
            <div>{member.login}</div>
            <span className="icon-owner">
              {member._id === chatOwner ? <BulbOutlined /> : null}
            </span>
          </div>
        </>
      ))}
    </div>
  );
};
