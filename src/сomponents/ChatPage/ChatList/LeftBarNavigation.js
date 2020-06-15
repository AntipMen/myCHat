import React from "react";
import "./ChatList.css";
import { CModal } from "./Modal/Modal";
import { SearchInput } from "../../../saga";
import { SearchOutlined } from "@ant-design/icons";

export const NavigationLeftBar = () => (
  <div className="block-user-header">
    <CModal />
    <div>
      <span className="fa fa-address-book-o" aria-hidden="true">
        <SearchOutlined />
      </span>
      <SearchInput className="input-search" />
    </div>
  </div>
);
