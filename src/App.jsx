import React, {Component} from 'react';

import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv4 = require('uuid/v4');

const ws = new WebSocket("ws://0.0.0.0:3001/");
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    }

    this.onNewPost = this.onNewPost.bind(this);
  }

    componentDidMount() {
      var self = this;
      console.log("componentDidMount <App />");
      ws.onmessage = function(event) {
        let messagesRecieved = JSON.parse(event.data);
        let allMessages = self.state.messages.concat(messagesRecieved);
        self.setState({messages: allMessages});
    }
  }


    onNewPost(username,content){
      const newMessage = {id: uuidv4(), username: username, content: content};
      var self = this;
      const currentUser = self.state.currentUser;
      if(currentUser == username){
        ws.send(JSON.stringify(newMessage));
      }else{
        newMessage.content = `${currentUser} changed their name to ${username}`
        self.setState({currentUser: username})
        ws.send(JSON.stringify(newMessage));
      }
    }

  render() {

    return (
      <div>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onNewPost={this.onNewPost}/>
    </div>
    );
  }
}
export default App;
