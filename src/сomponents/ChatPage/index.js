import React from "react";
import "./index.css";
import { NavigationLeftBar } from "./ChatList/LeftBarNavigation";
import { CHeaderChat } from "./MessageForm/HeaderMessageForm";
import { LeftNavigation } from "./ChatList";
import { MainPage } from "../../helpers";

export const Header = () => (
  <>
    <header className="header">
      <NavigationLeftBar />
      <CHeaderChat />
    </header>
  </>
);
export const Home = () => (
  <>
    <main className="main-block">
      <LeftNavigation />
      <div className="block-chat">
        <MainPage />
      </div>
    </main>
  </>
);
