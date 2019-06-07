import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input, List, ListItem, Thumbnail } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
let API = new api();
class AlertaScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    render() {
      return (
        <Container>
          <Content>
            <List>
              <ListItem thumbnail >
                <Left>
                  <Thumbnail style={{height:20,width:50}} square source={require('../../assets/rojo.png')} />
                </Left>
                <Body>
                  <Text>Prioridad 1</Text>
                  <Text note numberOfLines={1}>Esta es una alerta de priordad 1 . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail >
                <Left>
                  <Thumbnail style={{height:20,width:50}}  square source={require('../../assets/amarillo.png')} />
                </Left>
                <Body>
                  <Text>Prioridad 2</Text>
                  <Text note numberOfLines={1}>Esta es una alerta de priordad 2 . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail >
                <Left>
                  <Thumbnail style={{height:20,width:50}}  square source={require('../../assets/verde.png')} />
                </Left>
                <Body>
                  <Text>Prioridad 3</Text>
                  <Text note numberOfLines={1}>Esta es una alerta de priordad 3 . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
            </List>
          </Content>
        </Container>
      );
    }
  }
  export default AlertaScreen;