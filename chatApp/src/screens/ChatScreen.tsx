import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
    
  };
let API = new api();
class ChatScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    render(){
            return (
              <Content padder>
                <List>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                  <ListItem avatar>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Kumar Pratik</Text>
                      <Text note>Doing what you like will always keep you happy . .</Text>
                    </Body>
                    <Right>
                      <Text note>3:43 pm</Text>
                    </Right>
                  </ListItem>
                </List>
              </Content>
          )
    }
}
  export default ChatScreen;