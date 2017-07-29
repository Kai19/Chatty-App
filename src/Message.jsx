import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    switch(this.props.message.type){
      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username">{this.props.message.username}</span>
            <span className="message-content">{this.props.message.content}</span>
          </div>
        );
      break;
      case "incomingNotification":
        return (
          <div className="message-system">
            {this.props.message.oldName} changed their name to {this.props.message.newName}
          </div>
        );
      break;
      default:
        console.log("Error in message")
        return (<div></div>)
      break;
    }
  }
}
export default Message;
