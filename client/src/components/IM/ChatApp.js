

import React from 'react';
import io from 'socket.io-client';
import config from './config';
import Messages from './Messages';
import ChatInput from './ChatInput';
// import './ChatApp.css';


class ChatApp extends React.Component {
  socket = {};
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.sendHandler = this.sendHandler.bind(this);
    
    // Connect to the server
    this.socket = io(config.api, { query: `username=${props.username}` }).connect();

    // Listen for messages from the server
    this.socket.on('server:message', message => {
      this.addMessage(message);
    });
  }

  sendHandler(message) {
    const messageObject = {
      username: this.props.username,
      message
    };

    // Emit the message to the server
    this.socket.emit('client:message', messageObject);

    messageObject.fromMe = true;
    this.addMessage(messageObject);
  }

  addMessage(message) {
    // Append the message to the component state
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }

  render() {
    return (
      <div className="container" style={{"display": "flex",
        "flex-direction": "column", "min-height": "100vh",
  "max-height": "100vh",
  "max-width": '100%'}}>
        <h3 style={{ "text-align": "center",
  "padding": "20px 0",
  "margin": "0",
  "border-bottom": "1px solid #ddd",
  "background-color": "#eee"}}>Guide Trip</h3>
        <Messages messages={this.state.messages} />
        <ChatInput onSend={this.sendHandler} />
      </div>
    );
  }

}
ChatApp.defaultProps = {
  username: 'Anonymous'
};

export default ChatApp;
