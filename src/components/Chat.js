import React,{Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

import {} from 'react-native';

import PropTypes from 'prop-types';

import Backend from '../Backend';

class Chat extends React.Component{
    state = {
        messages: []
    };
    render(){
        return(
            <GiftedChat
                messages={this.state.messages}
                onSend={(message) => {Backend.sendMessage(message);}}
                user={{_id: Backend.getUid(), name: this.props.name,}}

            />
        );
    }

    componentDidMount(){
        Backend.loadMessages((message) => {
            this.setState((previousState) => {
                return{
                    messages: GiftedChat.append(previousState.messages, message),
                };
            });
        });
    }

    componentWillMount(){
        Backend.closeChat();
    }
}


Chat.defaultProps = {name: 'John',};

Chat.propTypes = {
    name: PropTypes.string,
}

export default Chat;