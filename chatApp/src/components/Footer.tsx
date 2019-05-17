import React from 'react'
import {NavigationScreenProp } from 'react-navigation';
import { Container, Content, List,Footer,FooterTab, ListItem, Accordion, Button, Icon,Left,Right, Text, Item  } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
export interface Props {
}
interface State {
  activeButton?: string;
}
export default class FooterComponent extends React.Component<Props,State>{
  constructor(props: Props){
    super(props);
    this.state = {
      activeButton:'chat',
    }
  }
    render(){
        return (
            <Footer>
            <FooterTab >
                <Button vertical onPress={()=> this.setState({activeButton:'alerta'})} active={this.state.activeButton === 'alerta'}>
                  <Icon name="ios-alarm" />
                  <Text>Alertas</Text>
                </Button>
                <Button vertical  onPress={()=> this.setState({activeButton:'aviso'})} active={this.state.activeButton === 'aviso'}>
                  <Icon name="md-notifications"/>
                  <Text>Avisos</Text>
                </Button>
                <Button vertical onPress={()=> this.setState({activeButton:'mensaje'})} active={this.state.activeButton === 'mensaje'}>
                  <Icon name="ios-chatbubbles" />
                  <Text>Chats</Text>
                </Button>
                <Button vertical onPress={()=> this.setState({activeButton:'agenda'})} active={this.state.activeButton === 'agenda'}>
                  <Icon name="ios-calendar" />
                  <Text>Agenda</Text>
                </Button>
            </FooterTab>
          </Footer>
        )
    }
  }