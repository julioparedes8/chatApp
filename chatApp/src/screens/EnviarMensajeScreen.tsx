import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
let API = new api();
class EnviarMensajeScreen extends React.Component<Props> {
    constructor(props: Props){
      super(props);
    }
    render(){
          return (
            <Container>
              <Header style={{backgroundColor:"#70CCF6"}}>
              <Left style={{ flex:1}}>
                    
                    <Button
                      transparent
                      onPress={()=>this.props.navigation.navigate("Home")}
                        >
                      <Icon type="Ionicons" name="ios-arrow-back" />
                    </Button>
                  
                </Left>
                  <Body style={{ flex:1}}>
                    <Title  style={{ alignSelf: 'center'}}>Nuevo Chat</Title>
                  </Body>
                  <Right style={{ flex:1}}>
                    
                  </Right>
              </Header>
              <Content>
                <Form>
                  <Item>
                    <Input placeholder="Usuario" />
                  </Item>
                  <Button rounded block info  style={styles.button}  onPress={()=>this.props.navigation.navigate("Chat")} >
                    <Text>Iniciar Chat</Text>
                  </Button>
                </Form>
              </Content>
            </Container>
          )
    }
}
const styles = StyleSheet.create({
  button:{
    margin: 60, 
    marginTop: 50,
    backgroundColor:'#70CCF6'
  }
});
export default EnviarMensajeScreen;