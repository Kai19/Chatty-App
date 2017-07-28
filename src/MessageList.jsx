import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log("MessageList messages:", this.props.messages.map(m=>JSON.stringify(m)));
    return(
    <main className="messages">
      {
        this.props.messages
        .filter((m) => m.type === 'incomingMessage' || m.type === 'incomingNotification')
        .map((currentMessage)=>{
          return <Message
            lazy={currentMessage}
            key={currentMessage.id}
            // username={currentMessage.username}
            // content={currentMessage.content}
            // type={currentMessage.type}
            // currentUser={this.props.currentUser}
          />
        })
      }
    </main>
  );
  }
}
export default MessageList;
