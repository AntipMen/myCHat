import React from "react";
import "./index.css";
import { CModal } from "./Modal";
import { SearchInput } from "../../../saga";
import { SearchOutlined } from "@ant-design/icons";

export const NavigationLeftBar = () => (
  <div className="block-user-header">
    <CModal />
    <div className="input-search">
      <span className="fa fa-address-book-o" aria-hidden="true">
        <SearchOutlined />
      </span>
      <SearchInput className="input-search" />
    </div>
  </div>
);
