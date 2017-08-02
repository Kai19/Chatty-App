import React, {Component} from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// Class App recieves response from server and renders components from Chatbar, NavBar, MessageList and Messages
class App extends Component {
  constructor(props) {
    super(props);
    // clientCount represents the number of users connected to server
    this.state = {
      currentUser: "Anonymous", // user defaults to Anonymous if username field is empty
      messages: [],
      clientCount: 0,
    }

    this.onNewPost = this.onNewPost.bind(this);
    this.onNewName = this.onNewName.bind(this);
  }

  componentDidMount() {
    const self = this;
    const ws = new WebSocket("ws://0.0.0.0:3001/");
    self.socket = ws;

    ws.onmessage = function(event) {
      let messageRecieved = JSON.parse(event.data);

      switch(messageRecieved.type) {
        // If incoming data has clientCount type, clientCount in state will be updated
        case "clientCount":
          self.setState({clientCount: messageRecieved.number});
        break
        // If incoming data has incomingNotification or incomingMessage type
        // Messages in state will be updated to include messageRecieved
        case "incomingNotification":
        case "incomingMessage":
          let allMessages = self.state.messages.concat(messageRecieved);
          self.setState({messages: allMessages});
        break;
      }
    }
  }

  // This function will send content & currentUser to server
  // This message will have an incomingMessage type
  onNewPost(content) {
    const newMessage = {username: this.state.currentUser, content: content};
    const currentUser = this.state.currentUser;
    newMessage.type = "incomingMessage";
    this.socket.send(JSON.stringify(newMessage));
  }

  // This function will send user's new username and old username to server
  // Set incomingNotification type
  // If username is empty, default to Anonymous
  onNewName(username) {
    const newMessage = {type: "incomingNotification", oldName: this.state.currentUser, newName: username};
    if(username === "") {
      newMessage.newName = "Anonymous";
      this.setState({currentUser: "Anonymous"});
    }else{
      this.setState({currentUser: username});
    }
    this.socket.send(JSON.stringify(newMessage));
  }

  // Render page and pass in data from props
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
