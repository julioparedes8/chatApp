import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
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
                  <ListItem thumbnail button={true} onPress={this.handleClick}>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note >3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                  <ListItem thumbnail>
                    <Left>
                      <Thumbnail source={require('../../assets/user.png')} />
                    </Left>
                    <Body>
                      <Text>Emisor</Text>
                      <Text note numberOfLines={1}>Aqui va el mensaje . .</Text>
                    </Body>
                    <Right>
                      
                        <Text note>3:45pm</Text>
                      
                    </Right>
                  </ListItem>
                </List>
              </Content>
          )
    }
}
  export default MessagesScreen;