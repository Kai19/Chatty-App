import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message/>");
    switch(this.props.lazy.type){
      case "incomingMessage":
        return (
          <div className="message">
            <span className="message-username">{this.props.lazy.username}</span>
            <span className="message-content">{this.props.lazy.content}</span>
          </div>
        );
      break;
      case "incomingNotification":
        return (
          <div className="message-system">
            {this.props.lazy.oldName} changed their name to {this.props.lazy.newName}
          </div>
        );
      break;
      default:
        console.log("THIS SHOULD NOT BE HAPPENING.  WHY.  WHY.   WHYYYYYYYYYY.")
        return (<div></div>)
      break;
    }
  }
}
export default Message;

// <div class="message system">
// Anonymous1 changed their name to nomnom.
// </div>
