import React, { useMemo } from "react";
conn
import { actionFetch, GQL } from "./actionFetch-GQL";
// import { Messages } from "../ChatPage/MessageForm/MessageForm";
import { store } from "../../reducers/index.js";
import { actionCreateMessage } from "./NewMessage";



export const MessagesList = ({ allmessages }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(allmessages);
  console.log(messages);

  useEffect(() => {
    const socket = io("http://chat.fs.a-level.com.ua/");
    if (localStorage.authToken) socket.emit("jwt", localStorage.authToken);

    socket.on("jwt_ok", (data) => console.log(data));
    socket.on("jwt_fail", (error) => console.log(error));
    socket.on("msg", (message) => {
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const sendMessage = (event) => {
    //  debugger;
    event.preventDefault();
    setMessage("");
  };

  return (
    <>
      {" "}
      <div className="block-chat-main">
        <Messages messages={messages} />
        <CMessagesPage />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          onMessage={actionCreateMessage}
        />
      </div>
    </>
  );
};

export class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const value = this.state.value;
    console.log(value);
  };

  handleValueChange = (event) => {
    this.setState({ value: event.target.value });
  };
  render() {
    return (
      <>
        <form className="chat-message-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={this.state.value}
            onChange={this.handleValueChange}
            // onKeyPress={(event) => event.key === "Enter" ? sendMessage(event) : null }
          />
          <button onClick={() => this.props.onMessage(this.state.value)}>
            Send
          </button>
        </form>
      </>
    );
  }
}

export const Messages = ({ allmessages }) => {
  console.log(allmessages);
  return (
    <div className="chat-message-list">
      {allmessages.map((message) => (
        <div>
          <Message message={message} key={message._id} />
        </div>
      ))}
    </div>
  );
};

const Message = ({ message }) => {
  return (
    <div className="message" key={message._id}>
      <div className="message-text">{message.text}</div>
      <div className="message-username">{message.owner.login}</div>
    </div>
  );
};

export const CMessagesList = connect((state) => ({
  allmessages:
    state.promise.allmessages &&
    state.promise.allmessages.payload &&
    state.promise.allmessages.payload.data.MessageFind,
}))(Messages);

const MessagesPage = ({
  match: {
    params: { _id },
  },
  getData,
}) => {
  useMemo(() => getData(_id) && false, [_id]);

  return (
    <>
      <CMessagesList />
    </>
  );
};

export const CMessagesPage = connect(null, { getData: actionAllMessages })(
  MessagesPage
);
