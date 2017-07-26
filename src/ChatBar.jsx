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

  }

  inputKeyUp(e) {
    if(e.key === 'Enter'){
        this.onContent(e);
      }
    }

  onContent(event) {
    this.props.onNewPost(event.target.value);
    event.target.value = '';
}

  render() {
    console.log("Rendering <ChatBar/>");
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder={this.props.currentUser.name}  />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyUp={this.inputKeyUp} />
        </footer>
      );
  }
}
export default ChatBar;
