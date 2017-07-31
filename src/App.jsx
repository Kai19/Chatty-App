import React, {Component} from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: "", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clientCount: 0,
    }

    this.onNewPost = this.onNewPost.bind(this);
    this.onNewName = this.onNewName.bind(this);
  }

  componentDidMount() {
    var self = this;
    const ws = new WebSocket("ws://0.0.0.0:3001/");
    self.socket = ws;

    ws.onmessage = function(event) {
      let messageRecieved = JSON.parse(event.data);

      switch(messageRecieved.type){
        case "clientCount":
          self.setState({clientCount: messageRecieved.number})
        break
        case "incomingNotification":
        case "incomingMessage":
          let allMessages = self.state.messages.concat(messageRecieved);
          self.setState({messages: allMessages})
        break;
      }
    }
  }

  onNewPost(content){
    const newMessage = {username: this.state.currentUser, content: content};
    const currentUser = this.state.currentUser;
    newMessage.type = "incomingMessage";
    this.socket.send(JSON.stringify(newMessage));
  }

  onNewName(username) {
    const newMessage = {type: "incomingNotification", oldName: this.state.currentUser, newName: username};
    if(username === ""){
      newMessage.newName = "Anonymous";
      this.setState({currentUser: "Anonymous"});
    }else{
      this.setState({currentUser: username});
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <NavBar clientCount={this.state.clientCount}/>
        <MessageList messages={this.state.messages} type={this.state.type} currentUser={this.state.currentUser}/>
        <ChatBar currentUser={this.state.currentUser} onNewName={this.onNewName} onNewPost={this.onNewPost}/>
      </div>
    );
  }
}
export default App;
