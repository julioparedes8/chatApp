import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text,Label } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import DatePicker from 'react-native-datepicker';
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
    chosenDate?: any;
}
let API = new api();
class CrearTareaScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = { chosenDate: new Date() };
      this.setDate = this.setDate.bind(this);
    }
    setDate(newDate:any) {
        this.setState({ chosenDate: newDate });
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
                    <Title  style={{ alignSelf: 'center'}}>Nueva Tarea</Title>
                  </Body>
                  <Right style={{ flex:1}}>
                    
                  </Right>
              </Header>
              <Content>
                <Form>
                    <Item floatingLabel>
                        <Label>Descripción</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last>
                        <Label>Lugar</Label>
                        <Input />
                    </Item>
                    <DatePicker
                        style={{width: 200, margin: 80, 
                            marginTop: 50,}}
                        date={this.state.chosenDate}
                        mode="datetime"
                        format="YYYY-MM-DD HH:mm"
                        confirmBtnText="Ok"
                        cancelBtnText="Cancelar"
                        customStyles={{
                            dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                            },
                            dateInput: {
                            marginLeft: 36
                            }
                        }}
                        minuteInterval={10}
                        onDateChange={(datetime:any) => {this.setState({chosenDate: datetime});}}
                        />
                    <Button rounded block info  style={styles.button} >
                        <Text>Registrar Tarea</Text>
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
export default CrearTareaScreen;