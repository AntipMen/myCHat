import React from "react";
import "./Modal.css";
import { MenuOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import { Button } from "antd";
import { PoweroffOutlined, CloseOutlined } from "@ant-design/icons";
import { actionAuthLogout } from "../../../../actions";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export default class Modal extends React.Component {
  state = {
    isOpen: false,
  };

  render() {
    return (
      <React.Fragment>
        <Button
          onClick={() => this.setState({ isOpen: true })}
          type="primary"
          icon={<MenuOutlined />}
        />

        {this.state.isOpen && (
          <div className="modal">
            <div className="close">
              {" "}
              <Button
                type="primary"
                icon={<CloseOutlined />}
                onClick={() => this.setState({ isOpen: false })}
              />
            </div>
            <div className="modal-body">
              <div className="modal-avatar">
                {" "}
                <img
                  src={
                    this.props.user.avatar &&
                    `http://chat.fs.a-level.com.ua/${this.props.user.avatar.url}`
                  }
                  width="200px"
                />
              </div>
              <div className="modal-user-info">
                <h1>{this.props.user.login}</h1>
              </div>
              <div className="modal-navigation"></div>
            </div>
            <CLogoutButton className="ant-btn ant-btn-primary">
              <Link to="/">
                <PoweroffOutlined /> Log out
              </Link>
            </CLogoutButton>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const CLogoutButton = connect((state) => ({ disabled: !state.auth.data }), {
  onClick: actionAuthLogout,
})(Button);

export const CModal = connect((state) => ({
  user:
    state.promise.user &&
    state.promise.user.payload &&
    state.promise.user.payload.data.UserFind[0],
}))(Modal);
