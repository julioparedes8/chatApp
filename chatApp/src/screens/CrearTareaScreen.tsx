import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text,Label, Textarea, Picker } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements'
import FooterComponent from '../components/Footer'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
    chosenDate?: any;
    selectedAviso?:string;
    selectedGrupo?:string;
    selectedTipo?:string;
    checked:boolean;
    enabled:boolean;
}
let API = new api();
class CrearTareaScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = { chosenDate: new Date(),selectedAviso:'',selectedGrupo:'',selectedTipo:'',checked: false,enabled: false };
      this.setDate = this.setDate.bind(this);
    }
    setDate(newDate:any) {
        this.setState({ chosenDate: newDate });
    }
    comboAviso(selected:string){
      this.setState({selectedAviso: selected})
    }
    comboGrupo(selected:string){
      this.setState({selectedGrupo: selected})
    }
    comboTipo(selected:string){
      this.setState({selectedTipo: selected})
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
                  <View style={{flexDirection:'row'}}>
                    <View
                        style={{
                          flexDirection: 'column',
                          height: 190,
                          width:260,
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
                          textAlign: 'left',
                          margin: 10,
                          alignItems:'flex-start'
                        }}>
                        <Text style={{fontWeight: 'bold',textAlign:'center'}}>Fecha</Text>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:10,marginBottom:10}}>Creación:</Text>
                          <DatePicker
                            style={{width: 160,marginLeft:13,marginRight:15,marginTop:5,marginBottom:5}}
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
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:10,marginBottom:10}} >Expiración:</Text>
                          <DatePicker
                            style={{width: 160, marginLeft:2,marginRight:15}}
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
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{ marginRight:5,marginTop:18,marginBottom:18}}>Aviso:</Text>
                          <View style={{width:200,marginLeft:2,marginRight:15,marginTop:3,marginBottom:3}}>
                            <Item picker>
                                <Picker
                                  mode="dropdown"
                                  iosIcon={<Icon name="arrow-down" />}
                                  style={{ width: undefined}}
                                  placeholder="Seleccionar"
                                  placeholderStyle={{ color: "#bfc6ea" }}
                                  placeholderIconColor="#007aff"
                                  selectedValue={this.state.selectedAviso}
                                  onValueChange={this.comboAviso.bind(this)}
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
                          height: 190,
                          width:115,
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
                          textAlign: 'left',
                         // margin: 10,
                          marginLeft:1,
                          marginBottom:10,
                          marginTop:10,
                          marginStart:10,
                          marginEnd:10,
                          alignItems:'flex-start'
                        }}>
                        <Text style={{fontWeight: 'bold',textAlign:'center'}}>Grupo</Text>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <CheckBox
                            title='Publicar'
                            size={17}
                            textStyle={{fontSize:12,fontWeight:'normal'}}
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked,enabled: !this.state.enabled})}
                          />
                        </View>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <View style={{width:110,marginLeft:2,marginRight:15,marginTop:3,marginBottom:3}}>
                            <Item picker>
                                <Picker
                                  mode="dropdown"
                                  iosIcon={<Icon name="arrow-down" />}
                                  style={{ width: undefined}}
                                  placeholder="Seleccionar"
                                  placeholderStyle={{ color: "#bfc6ea" }}
                                  placeholderIconColor="#007aff"
                                  selectedValue={this.state.selectedGrupo}
                                  onValueChange={this.comboGrupo.bind(this)}
                                  enabled={this.state.enabled}
                                >
                                  <Picker.Item label="Grupo 1" value="key0" />
                                  <Picker.Item label="Grupo 2" value="key1" />
                                </Picker>
                            </Item>
                          </View>
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
                        <View  style={{ flexDirection: 'row'}}>
                          <Text style={{textAlign:'left'}}>Creador:</Text>
                          <Text >Administrador</Text>
                        </View >
                        <View style={{ flexDirection: 'row'}}>
                        <Text style={{textAlign:'right'}}>Aviso:</Text>
                          <Item picker>
                              <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: undefined}}
                                placeholder="Seleccionar"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.selectedTipo}
                                onValueChange={this.comboTipo.bind(this)}
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