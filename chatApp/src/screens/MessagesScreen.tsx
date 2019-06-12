import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
};
let API = new api();
class MessagesScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    handleClick=()=>{
      const {navigate}= this.props.navigation
      navigate('Chat')
      //this.props.navigation.navigate("Login")
      // Call method from parent
      //this.props.onPress();
    }
    render(){
            return (
              <Content padder>
                <List>
                  <ListItem avatar button={true} onPress={this.handleClick}>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
                      <Text>Emisor</Text>
                      <Text note>Este es el contenido del mensaje . .</Text>
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
  export default MessagesScreen;