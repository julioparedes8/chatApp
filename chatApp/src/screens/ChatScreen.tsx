import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import { GiftedChat } from 'react-native-gifted-chat';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface User {
    _id: number;
    name: string;
    avatar: string; 
}
interface Messages {
    _id: number;
    text: string;
    createdAt: Date;
    user:User;
}
interface state{
  messages?:Messages[];
}
let API = new api();
class ChatScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = {
        messages:[]
      }
    }
    componentWillMount() {
      this.setState({
        messages: [
          {
            _id: 1,
            text: "Como estas?",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          },
          {
            _id: 2,
            text: "Hello developer",
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "React Native",
              avatar: "https://placeimg.com/140/140/any"
            }
          },
        ]
      })
    }
    onSend=(messages = [])=> {
      this.setState(previousState => {
        return ({
          messages: GiftedChat.append(previousState.messages, messages)
        });
      });
    }
    render(){
          return (
            <Container>
              <Header style={{backgroundColor:"#70CCF6",height:70}}>
                <Left style={{ flex:1}}>
                    
                      <Button
                        transparent
                        onPress={()=>this.props.navigation.push("Home")}
                          >
                        <Icon type="Ionicons" name="ios-arrow-back" />
                      </Button>
                    
                  </Left>
                  <Body style={{ flex:1}}>
                    <Title  style={{ alignSelf: 'center'}}>Conversación</Title>
                  </Body>
                  <Right style={{ flex:1}}>
                  
                  </Right>
                </Header>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                      _id: 1
                    }}
                />
                
            </Container>
            
          )
    }
}
  export default ChatScreen;