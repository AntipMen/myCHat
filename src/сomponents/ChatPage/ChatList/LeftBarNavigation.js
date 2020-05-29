import React from "react";
import "./ChatList.css";
import Modal from "./Modal/Modal";
//import { SearchInput } from "./SearchComponent";
import { SearchInput } from "../../../saga";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

const NavigationLeftBar = () => (
  <div className="block-user-header">
    <Modal />
    <div>
      <span class="fa fa-address-book-o" aria-hidden="true">
        <SearchOutlined />
      </span>
      <SearchInput className="input-search" />
    </div>
  </div>
);

export default NavigationLeftBar;
