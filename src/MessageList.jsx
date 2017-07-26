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
        this.props.messages.map((currentMessage)=>{
          return <Message key={currentMessage.id} username={currentMessage.username} content={currentMessage.content} />
        })
      }
    </main>
  );
  }
}
export default MessageList;
