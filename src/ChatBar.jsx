import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();

    this.state = {
      user: '',
      content: ''
    }

    this.onContent = this.onContent.bind(this);
    this.inputKeyUp = this.inputKeyUp.bind(this);
    this.onUser = this.onUser.bind(this);
  }

  inputKeyUp(e) {
    if(e.key === 'Enter'){
      this.props.onNewPost(this.state.user, this.state.content);
      }
    }

    onUser(event) {
      this.setState({user: event.target.value })
      // event.target.value = '';
    }
    onContent(event) {
      this.setState({content: event.target.value })
      // event.target.value = '';
    }

  render() {
    console.log("Rendering <ChatBar/>");
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Enter username" value={this.state.user} onChange={this.onUser} onKeyUp={this.inputKeyUp}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onContent} onKeyUp={this.inputKeyUp} />
        </footer>
      );
  }
}
export default ChatBar;
