import React, {Component} from 'react';

import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
const uuidv4 = require('uuid/v4');


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentUser: "Anonymous", // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      clients: 0
    }

    this.onNewPost = this.onNewPost.bind(this);
    // this.setState = this.setState.bind(this);
  }


  componentDidMount() {
    var self = this;
    console.log("componentDidMount <App />");
    const ws = new WebSocket("ws://0.0.0.0:3001/");
    self.socky = ws;

    ws.onmessage = function(event) {
      let messagesRecieved = JSON.parse(event.data);
      console.log(messagesRecieved)
      console.log(typeof messagesRecieved)
      if(typeof messagesRecieved == "number"){
        self.setState({clients: messagesRecieved})
        return
      }
      let allMessages = self.state.messages.concat(messagesRecieved);
      self.setState({messages: allMessages});
    }
  }

    onNewPost(username,content){
      const newMessage = {id: uuidv4(), username: username, content: content};
      const currentUser = this.state.currentUser;
      if (currentUser == username){
        newMessage.type = "incomingNotification";
      } else {
        newMessage.type = "postNotification";
        newMessage.currentUser = currentUser;
        this.setState({currentUser: username})
      }
      this.socky.send(JSON.stringify(newMessage));
    }



  render() {


    return (
      <div>
        <NavBar clients={this.state.clients}/>
        <MessageList messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} onNewPost={this.onNewPost}/>
      </div>
    );
  }
}
export default App;
