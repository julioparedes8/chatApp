import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
export interface Props {
    
  };
let API = new api();
class ChatNuevoScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    render(){
          return (
            <Container>
              <Header />
              <Content>
                <Form>
                  <Item>
                    <Input placeholder="Usuario" />
                  </Item>
                  <Button>Iniciar Chat</Button>
                </Form>
              </Content>
            </Container>
          )
    }
}
  export default ChatNuevoScreen;