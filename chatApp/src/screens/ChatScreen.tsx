import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import { GiftedChat } from 'react-native-gifted-chat';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
  messages?: [];
}
let API = new api();
class ChatScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = {
        messages:[]
      }
    }
    render(){
          return (
            <Container>
              <Header style={{backgroundColor:"#70CCF6"}}>
                <Left style={{ flex:1}}>
                    
                      <Button
                        transparent
                        onPress={()=>this.props.navigation.navigate("Home")}
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
                <Content padder>
                </Content>
              <GiftedChat
                    messages={this.state.messages}
                    onSend={(message)=>{
                      //
                    }}
                    user={{
                      _id: 1,
                    }}
                />
            </Container>
            
          )
    }
}
  export default ChatScreen;