import React, { Component, useState } from "react";
import "./FotStylesAll.css";
import "antd/dist/antd.css";
import { Button } from "antd";
import { DownloadOutlined, SmileOutlined } from "@ant-design/icons";
import {
  GQL,
  PromiseComponent,
  P,
  CError,
} from "../MainBlock/PromiseComponent";

const MessageView = ({ payload }) => {
  return <div>{payload.data.MessageUpsert.text}</div>;
};

const MessageForm = ({ onMessage }) => {
  const [message, setMessage] = useState("");
  return (
    <>
      <div>
        <ButtonSize />
        <input
          // className="text-message"
          placeholder="SendMessageForm"
          type="text"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button>
          <SmileOutlined />
        </button>
        <button onClick={() => onMessage(message)}>Send</button>
      </div>
      <div style={{ border: "solid 1px black" }}>{onMessage}</div>
      </>
  )
}
      /* <PromiseComponent
        Pending={P}
        Resolved={MessageView}
        Rejected={CError}
        promise={GQL(
          `mutation MesRedAll($text: String){
MessageUpsert (message: {
text: $text
chat: {
title: null
}
}){
_id
text
owner {
login
}
}
}`,
          { text: message }
        )}
      />
    </> */

// class MessageForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       text: "",
//     };
//   }

//   render() {

//     return (
//       <form className="message-form">
//         <ButtonSize />
//         <input
//           className="text-message"
//           placeholder="SendMessageForm"
//           type="text"
//           onChange={(e) => this.setState({ text: e.target.value })}
//           value={this.state.text}
//         />
//         <button>
//           <SmileOutlined />
//         </button>
//         <button>send</button>
//       </form>
//     );
//   }
//}

class ButtonSize extends Component {
  state = {
    size: "large",
  };

  handleSizeChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const { size } = this.state;
    return (
      <Button
        type="primary"
        shape="circle"
        icon={<DownloadOutlined />}
        size={size}
      />
    );
  }
}

export { MessageForm };
