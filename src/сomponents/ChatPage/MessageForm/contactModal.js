import React, { useState } from "react";
import "./Header.css";
import { UserAddOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Modal, Button } from "antd";
import { connect } from "react-redux";
import { actionAddMembers, actionSaveChat } from "../../../actions";
import { Pending } from "../../../helpers";

export const ContactsModal = ({ chats, params, allusers, onAdd }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const chatId = Object.values(chats).find((chat) => chat._id === params);
  let members = chatId.members.map((id) => id._id);

  return (
    <div>
      <Button
        type="primary"
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
              {allusers.map((user) => (
                <>
                  {user.login.length > 1 ? (
                    <div className="contact">
                      <div className="user-avatar">
                        {user.avatar != null ? (
                          <img
                            src={
                              user.avatar &&
                              `http://chat.fs.a-level.com.ua/${user.avatar.url}`
                            }
                            width="50px"
                            alt="avatar"
                          />
                        ) : (
                          <span className="circle-min">
                            <h1>{user.login.slice(0, 1)}</h1>
                          </span>
                        )}
                      </div>
                      <h3>
                        {user.login} ({user.nick})
                      </h3>

                      <Button
                        type="primary"
                        shape="circle"
                        icon={<UserAddOutlined />}
                        onClick={() =>
                          onAdd(params, user._id, members) && handleCancel()
                        }
                      />
                    </div>
                  ) : undefined}
                </>
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

export const CContactsModal = connect(
  (state) => ({
    allusers:
      state.promise.allusers &&
      state.promise.allusers.payload &&
      state.promise.allusers.payload.data.UserFind,
    params: state.router.match.params._id,
    chats: state.chats,
  }),
  { onAdd: actionAddMembers }
)(ContactsModal);
