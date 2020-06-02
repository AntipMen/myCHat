import React from "react";
import "./Header.css";
import {
  UserAddOutlined,
  CloseOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button, Input } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionAllUsers } from "../../../actions";
import { Pending } from "../../../helpers";

export default class ContactsModal extends React.Component {
  state = {
    isOpen: false,
    value: "",
  };

  render() {
    {
      console.log(this.props.allusers);
    }

    return (
      <React.Fragment>
        <Button
          onClick={() => this.setState({ isOpen: true })}
          type="primary"
          icon={<UsergroupAddOutlined />}
        />
        {this.state.isOpen && (
          <div className="contacts-modal">
            <div className="close">
              <Button
                type="primary"
                icon={<CloseOutlined />}
                onClick={() => this.setState({ isOpen: false })}
              />
            </div>
            <div className="contacts-search">
              <СSearchInput />
              {this.props.allusers ? (
                <div className="contacts-list">
                  {this.props.allusers.map((user) => (
                    <>
                      {user.login.length > 1 ? (
                        <div className="contact">
                          <h3>
                            {user.login} ({user.nick})
                          </h3>
                          <Button
                            type="primary"
                            shape="circle"
                            icon={<UserAddOutlined />}
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
          </div>
        )}
      </React.Fragment>
    );
  }
}

const СSearchInput = connect(
  ({ search: { query } }) => ({ value: query, placeholder: "Search..." }),
  {
    onChange(event) {
      //   return actionSearch(event.target.value);
    },
  }
)("input");

export const CContactsModal = connect((state) => ({
  allusers:
    state.promise.allusers &&
    state.promise.allusers.payload &&
    state.promise.allusers.payload.data.UserFind,
}))(ContactsModal);
