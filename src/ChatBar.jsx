import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(){
    super();

    this.state = {
      user: 'Anonymous',    // TODO: start with empty
      content: ''
    }

    this.onContentChange = this.onContentChange.bind(this);
    this.onContentKeyup = this.onContentKeyup.bind(this);
    this.onUserChange = this.onUserChange.bind(this);
    this.onUserBlur = this.onUserBlur.bind(this);
    this.onUserKeyup = this.onUserKeyup.bind(this);
  }

  // TODO: on prop change, refresh this.state.user

  onUserChange(event) {
    this.setState({user: event.target.value })
  }
  onUserBlur(event){        // TODO: use this
    this.props.onNewName(this.state.user);
  }
  onUserKeyup(event){
    if(event.key === 'Enter'){
      this.props.onNewName(this.state.user);
    }
  }

  onContentChange(event) {
    this.setState({content: event.target.value })
  }
  onContentKeyup(event) {
    if(event.key === 'Enter'){
      this.props.onNewPost(this.state.content);
      this.setState({content: ''});
    }
  }


  render() {
    console.log("Rendering <ChatBar/>");
      return (
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Enter username" value={this.state.user} onBlur={this.onBlur} onChange={this.onUserChange} onKeyUp={this.onUserKeyup}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.content} onChange={this.onContentChange} onKeyUp={this.onContentKeyup} />
        </footer>
      );
  }
}
export default ChatBar;
