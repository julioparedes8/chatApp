import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header,List,ListItem,Thumbnail, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
let API = new api();
class AvisoScreen extends React.Component<Props> {
    constructor(props:Props){
      super(props);
    }
    render() {
      return (
        <Container>
          <Content>
            <List>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
                </Body>
                <Right>
                  <Button transparent>
                    <Text>Ver</Text>
                  </Button>
                </Right>
              </ListItem>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail square source={require('../../assets/user.png')} />
                </Left>
                <Body>
                  <Text>Sankhadeep</Text>
                  <Text note numberOfLines={1}>Its time to build a difference . .</Text>
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
  export default AvisoScreen;