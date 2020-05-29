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
    loadings: [],
  };

  enterLoading = (index) => {
    const newLoadings = [...this.state.loadings];
    newLoadings[index] = true;
    this.setState({
      loadings: newLoadings,
    });
    setTimeout(() => {
      newLoadings[index] = false;
      this.setState({ loadings: newLoadings });
    }, 6000);
  };

  render() {
    const { loadings } = this.state;
    return (
      <React.Fragment>
        <Button
          onClick={() => this.setState({ isOpen: true })}
          type="primary"
          icon={<MenuOutlined />}
        />

        {this.state.isOpen && (
          <div className="modal">
            <div className="modal-body">
              <div className="close">
                {" "}
                <Button
                  type="primary"
                  icon={<CloseOutlined />}
                  loading={loadings[2]}
                  onClick={() => this.setState({ isOpen: false })}
                />
              </div>
              <div className="modal-user-info"></div>
              <div className="modal-navigation"></div>

              <div className="modal-about"></div>

              <CLogoutButton className="ant-btn ant-btn-primary">
                <Link to="/">
                  <PoweroffOutlined /> Log out
                </Link>
              </CLogoutButton>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const CLogoutButton = connect((state) => ({ disabled: !state.auth.data }), {
  onClick: actionAuthLogout,
})(Button);
