import React from 'react'
import {NavigationScreenProp } from 'react-navigation';
import { Container, Content, List,Footer,FooterTab, ListItem, Accordion, Button, Icon,Left,Right, Text, Item  } from "native-base";
export interface FooterComponentProps {
  navigation: NavigationScreenProp<any,any>
};
interface state {
  agenda?: boolean;
  alerta?: boolean;
  aviso?: boolean;
  chat?: boolean;
}
export default class FooterComponent extends React.Component<FooterComponentProps,any>{
    constructor(props: Readonly<FooterComponentProps>){
      super(props);
      this.state = {
        agenda:false,
        alerta:false,
        aviso:false,
        chat:true,
      }
    }
    selectedFooter = () =>{
      this.setState({ 
        agenda: !this.state.agenda 
      })
      this.props.navigation.navigate("Agenda");
    }
    render(){
        return (
            <Footer>
            <FooterTab style={{backgroundColor:"#5197F9"}}>
                <Button vertical  onPress={()=>this.props.navigation.navigate("Alerta")}>
                  <Icon name="ios-alarm" active={this.state.alerta==true}/>
                  <Text>Alertas</Text>
                </Button>
                <Button vertical onPress={()=>this.props.navigation.navigate("Aviso")}>
                  <Icon name="md-notifications" active={this.state.aviso==true}  />
                  <Text>Avisos</Text>
                </Button>
                <Button vertical active onPress={()=>this.props.navigation.navigate("Chat")}>
                  <Icon name="ios-chatbubbles" active/>
                  <Text>Chats</Text>
                </Button>
                <Button vertical onPress={()=>this.props.navigation.navigate("Agenda")} >
                  <Icon name="ios-calendar"/>
                  <Text>Agenda</Text>
                </Button>
            </FooterTab>
          </Footer>
        )
    }
}