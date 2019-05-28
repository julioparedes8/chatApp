import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text,Label, Textarea, Picker } from 'native-base';
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
    selected2?:string;
}
let API = new api();
class CrearTareaScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = { chosenDate: new Date(),selected2:'' };
      this.setDate = this.setDate.bind(this);
    }
    setDate(newDate:any) {
        this.setState({ chosenDate: newDate });
    }
    onValueChange2(selected:string){
      this.setState({selected2: selected})
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
                  <View
                      style={{
                        flexDirection: 'column',
                        height: 200,
                        // Set border width.
                        borderWidth: 2,
                        // Set border Hex Color Code Here.
                        borderColor: '#F7F7F7',
                        // Setting up Text Font Color.
                        color: 'black',
                        // Setting Up Background Color of Text component.
                        backgroundColor : 'white',
                        // Adding padding on Text component.
                        padding : 2,
                        fontSize: 20,
                        textAlign: 'center',
                        margin: 10,
                        alignItems:'center'
                      }}>
                      <Text style={{fontWeight: 'bold'}}>Fecha</Text>
                      <View style={{ flexDirection: 'row',alignItems:'center'}}>
                        <Text>Creación:</Text>
                        <DatePicker
                          style={{width: 160, margin: 10}}
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
                      </View>
                      <View style={{ flexDirection: 'row',alignItems:'center'}}>
                        <Text>Expiración:</Text>
                        <DatePicker
                          style={{width: 150, margin: 10}}
                          date={this.state.chosenDate}
                          mode="date"
                          format="YYYY-MM-DD"
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
                      </View>
                      <View style={{ flexDirection: 'row',alignItems:'center'}}>
                        <Text>Aviso:</Text>
                        <View style={{width:200}}>
                          <Item picker>
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined}}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                              >
                                <Picker.Item label="Al Momento" value="key0" />
                                <Picker.Item label="Ninguno" value="key1" />
                                <Picker.Item label="1 minuto" value="key2" />
                                <Picker.Item label="5 minutos" value="key3" />
                                <Picker.Item label="15 minutos" value="key4" />
                                <Picker.Item label="30 minutos" value="key5" />
                                <Picker.Item label="1 hora" value="key6" />
                                <Picker.Item label="2 horas" value="key7" />
                              </Picker>
                          </Item>
                        </View>
                      </View>
                  </View>  
                  <View
                      style={{
                        flexDirection: 'column',
                        height: 285,
                        // Set border width.
                        borderWidth: 2,
                        // Set border Hex Color Code Here.
                        borderColor: '#F7F7F7',
                        // Setting up Text Font Color.
                        color: 'black',
                        // Setting Up Background Color of Text component.
                        backgroundColor : 'white',
                        // Adding padding on Text component.
                        padding : 2,
                        fontSize: 20,
                        margin: 10,
                      }}>
                      <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Detalles</Text>
                      <View style={{ flexDirection: 'row'}}>
                        <View style={{justifyContent: 'flex-start'}}>
                          <Text>Creador: Administrador</Text>
                        </View>
                        <View style={{marginLeft: 'auto'}}></View>
                        <View style={{justifyContent: 'flex-end'}}>
                          <Text>Tipo:</Text>
                          <View style={{width:80}}>
                          <Item picker>
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined}}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                              >
                                <Picker.Item label="Llamada" value="key0" />
                                <Picker.Item label="Reunión" value="key1" />
                                <Picker.Item label="Correo" value="key2" />
                                <Picker.Item label="Otro" value="key3" />
                              </Picker>
                          </Item>
                        </View>
                        </View>
                      </View>
                  </View>
                    <Button rounded block info  style={styles.button} >
                        <Text>Crear Tarea</Text>
                    </Button>
                </Form>
              </Content>
            </Container>
          )
    }
}
const styles = StyleSheet.create({
  button:{
    margin: 50,
    marginBottom:10, 
    marginTop: 10,
    backgroundColor:'#70CCF6'
  }
});
export default CrearTareaScreen;