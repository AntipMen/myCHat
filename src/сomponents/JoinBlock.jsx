import React from "react";
import io from "socket.io-client";

const socket = io();

function JoinBlock() {
  return (
    <div className="join-block">
      <input type="text" placeholder="Room ID" />
      <input type="text" placeholder="Your name" />
      <button>COME</button>
    </div>
  );
}

export default JoinBlock;
