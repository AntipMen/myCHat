import React from "react";
import "./ChatList.css";
import { CModal } from "./Modal/Modal";
//import { SearchInput } from "./SearchComponent";
import { SearchInput } from "../../../saga";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";

export const NavigationLeftBar = () => (
  <div className="block-user-header">
    <CModal />
    <div>
      <span class="fa fa-address-book-o" aria-hidden="true">
        <SearchOutlined />
      </span>
      <SearchInput className="input-search" />
    </div>
  </div>
);
