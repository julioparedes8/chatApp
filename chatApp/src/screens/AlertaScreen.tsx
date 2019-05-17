import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
let API = new api();
class AlertaScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    render(){ 
      return(
        <Content padder>
          <Card>
              <CardItem>
                  <Body>
                      <Text>Alerta</Text>
                  </Body>
              </CardItem>
            </Card>
        </Content>
        )
    }
  }
  export default AlertaScreen;