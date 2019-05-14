import React from 'react'
import {NavigationScreenProp } from 'react-navigation';
import { Container, Content, List,Footer,FooterTab, ListItem, Accordion, Button, Icon,Left,Right, Text, Item  } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
export interface FooterComponentProps {
  navigation: NavigationScreenProp<any,any>
};
interface state {
  activeButton?: string;
}
export default class FooterComponent extends React.Component<FooterComponentProps,state>{
    constructor(props: Readonly<FooterComponentProps>){
      super(props);
      this.state = {
        activeButton:'chat',
      }
      this._retrieveData()
    }
    _retrieveData = async () => {
      try {
        const value = await AsyncStorage.getItem('activeButton');
        console.log('retrive'+value);
        if (value !== null) {
          // We have data!!
          this.state = {
            activeButton:value,
          }
        }
      } catch (error) {
        // Error retrieving data
      }
    };
    setFooterActive=async (active: string)=>{
      try {
        await AsyncStorage.mergeItem('activeButton', JSON.stringify (active))
        const tkn = await AsyncStorage.getItem('activeButton')
        console.log('merge'+tkn)
      } catch (e) {
        // saving error
      }
    }
    Alerta=()=>{
      this.setFooterActive('alerta')
      this.setState({activeButton:'alerta'})
      console.log('aqui')
      //this.props.navigation.navigate("Alerta")
    }
   
    Aviso=()=>{
      this.setFooterActive('aviso')
      this.setState({activeButton:'aviso'})
      //this.props.navigation.navigate("Aviso")
    }
   
    Chat=()=>{
      this.setFooterActive('chat')
      this.setState({activeButton:'chat'})
      //this.props.navigation.navigate("Chat")
    }
   
    Agenda=()=>{
      this.setFooterActive('agenda')
      this.setState({activeButton:'agenda'})
      //this.props.navigation.navigate("Agenda")
    }
    render(){
        return (
            <Footer>
            <FooterTab style={{backgroundColor:"#5197F9"}}>
                <Button vertical  onPress={()=>this.setFooterActive('alerta')} active={this.state.activeButton === 'alerta'}>
                  <Icon name="ios-alarm" />
                  <Text>Alertas</Text>
                </Button>
                <Button vertical onPress={()=>this.Aviso()} active={this.state.activeButton === 'aviso'}>
                  <Icon name="md-notifications"/>
                  <Text>Avisos</Text>
                </Button>
                <Button vertical onPress={()=>this.Chat()} active={this.state.activeButton === 'chat'}>
                  <Icon name="ios-chatbubbles"/>
                  <Text>Chats</Text>
                </Button>
                <Button vertical onPress={()=>this.Agenda()} active={this.state.activeButton === 'agenda'}>
                  <Icon name="ios-calendar"/>
                  <Text>Agenda</Text>
                </Button>
            </FooterTab>
          </Footer>
        )
    }
}