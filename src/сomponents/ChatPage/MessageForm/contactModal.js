import React, { useState } from "react";
import "./Header.css";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { actionAddMembers, actionChatList } from "../../../actions";
import { Pending } from "../../../helpers";
import { AvatarColors } from "./messageList/avatars";

export const ContactsModal = ({
  chats,
  params,
  allusers,
  onAdd,
  onUpdate,
  auth,
}) => {
  const [visible, setVisible] = useState(false);

  const isMe = auth.data.sub.id;
  const token = auth.jwt;
  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const chatId = Object.values(chats).find((chat) => chat._id === params);
  let members = chatId.members.map((id) => id._id);
  const valid = members.find((i) => i === chatId.owner._id) === isMe;

  return (
    <div>
      <Button
        type="primary"
        disabled={!valid}
        onClick={showModal}
        icon={<UsergroupAddOutlined />}
        style={{ backgroundColor: "#69c0ff" }}
      />
      <Modal
        visible={visible}
        title="Add Members"
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Return
          </Button>,
        ]}
      >
        <div className="contacts-search">
          {allusers ? (
            <div className="contacts-list">
              {Object.values(allusers).map((user) => (
                <div className="contact" key={user._id}>
                  {user.login !== "" &&
                  user.login !== " " &&
                  user.login.length > 0 ? (
                    <>
                      <UserAvatar user={user} />
                      <span>
                        {user.login.length > 10 ? (
                          <h3>{user.login.slice(0, 11) + "..."}</h3>
                        ) : (
                          <h3>{user.login}</h3>
                        )}
                        ({user.nick})
                      </span>
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<UserAddOutlined />}
                        onClick={() =>
                          onAdd(params, user._id, members) &&
                          onUpdate(token, isMe) &&
                          handleCancel()
                        }
                      />
                    </>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <Pending />
          )}
        </div>
      </Modal>
    </div>
  );
};

const UserAvatar = ({ user }) => {
  const { color, colorLighten } = AvatarColors(user.login);
  return (
    <div className="user-avatar">
      {user.avatar != null ? (
        <img
          src={
            user.avatar && `http://chat.fs.a-level.com.ua/${user.avatar.url}`
          }
          width="50px"
          alt="avatar"
        />
      ) : (
        <span
          className="circle-min"
          style={{
            background: `linear-gradient(135deg, ${color} 0%, ${colorLighten} 96.52%)`,
          }}
        >
          <h1>{user.login.slice(0, 1)}</h1>
        </span>
      )}
    </div>
  );
};

export const CContactsModal = connect(
  (state) => ({
    allusers: state.users,
    params: state.router.match.params._id,
    chats: state.chats,
    auth: state.auth,
  }),
  { onAdd: actionAddMembers, onUpdate: actionChatList }
)(ContactsModal);
