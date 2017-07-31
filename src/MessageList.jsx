import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
    <main className="messages">
      {
        this.props.messages
        .filter((m) => m.type === 'incomingMessage' || m.type === 'incomingNotification')
        .map((currentMessage)=>{
          return <Message
            message={currentMessage}
            key={currentMessage.id}
          />
        })
      }
    </main>
  );
  }
}
export default MessageList;
