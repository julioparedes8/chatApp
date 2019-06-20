import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text,Label, Textarea, Picker } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import DatePicker from 'react-native-datepicker';
import localstorage from '../localstorage';
import { CheckBox } from 'react-native-elements'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface state{
    creacionDate?: string;
    expiracionDate?: string;
    selectedAviso?:string;
    selectedGrupo?:string;
    selectedTipo?:string;
    checked:boolean;
    enabled:boolean;
    asunto:string;
    contenido:string;
    refresh?: String;
    token?:String;
    macADD?:String;
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let config={}
let config2={}
let token=""
let refresh=""
let usuario:String;
class CrearTareaScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = { asunto:'',contenido:'',expiracionDate:'2019-06-20',creacionDate: "2019-06-20",selectedAviso:'Al Momento',selectedGrupo:'',selectedTipo:'LLAMADA',checked: false,enabled: false,macADD:'',token: '',refresh:'' };
      this.setDateCreacion = this.setDateCreacion.bind(this);
      this.setDateExpiracion = this.setDateExpiracion.bind(this);
      usuario='PRUEBACHAT'
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
      this.upDateToken()
    }
    //obtiene mac 
    upDateToken(){
      LOCALSTORAGE.getToken().then(response=>{
        this.setState({token:response})
        console.log(this.state.token)
        config = {
          headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD }
        }
      })
      LOCALSTORAGE.getRefresh().then(response=>{
        this.setState({refresh:response})
        console.log(this.state.refresh)
        config2 = {
          headers: { 'tenantId':'macropro','refreshToken': this.state.refresh,'Content-Type': 'application/json','MacAddress':this.state.macADD }
        }
      })
    }
    componentDidMount(){
      this.upDateToken()
    }
    //actualiza y refleja el valor de datetime fechaCreación
    setDateCreacion(newDate:any) {
        this.setState({ creacionDate: newDate });
    }
    //actualiza y refleja el valor de datetime fechaExpiración
    setDateExpiracion(newDate:any) {
      this.setState({ expiracionDate: newDate });
    }
    //actualiza y refleja el valor de combobox Aviso
    comboAviso(selected:string){
      this.setState({selectedAviso: selected})
    }
    //actualiza y refleja el valor de combobox grupo
    comboGrupo(selected:string){
      this.setState({selectedGrupo: selected})
    }
    //actualiza y refleja el valor de combobox tipo
    comboTipo(selected:string){
      this.setState({selectedTipo: selected})
    }
    crearTarea=()=>{
      //validaciones
      if (this.state.asunto==""){
        this.mensajeShow("Error","Ingrese asunto",1)
      } else if (this.state.contenido==""){
        this.mensajeShow("Error","Ingrese Contenido",1)
      } else{
        //hacer peticion
        this.peticion()
        this.mensajeShow("Petición Éxitosa",'Se agrego la tarea correctamente' + this.state.creacionDate + " " +this.state.expiracionDate + " " + "aviso: "+this.state.selectedAviso + " Asunto: " + this.state.asunto + " contenido: "+this.state.contenido,2)
      }
    }
    mensajeShow = (titulo:any,mensaje:any,tipo:any)=>{
      Alert.alert(
        titulo,
        mensaje,
        [
          {text: 'OK', 
          onPress: () => ""},
        ],
        {cancelable: false},
      );
    }
    peticion(){
      let data:any={
        "asunto": this.state.asunto,
        "contenido": this.state.contenido,
        "descartada": 0,
        "fechaCreacion": this.state.creacionDate,
        "fechaExpiracion": this.state.expiracionDate,
        "fechaRecordatorio": '2019-06-28',
        "leido":0,
        "tipo": this.state.selectedTipo,
        "creador_id": 1,
        "destinatario_id": 1,
      }
      API.insert('SysTareaRest',data,config)
      .then(response => {
      const parsedJSON = response;
      //const usuario: Usuario = parsedJSON as Usuario;
      console.log('Objetos regresados: ' +parsedJSON);
      })
      .catch(error => console.log(error))
    }
    //crea el diseño de la pantalla
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
                          height: 190,
                          // Set border width.
                          borderWidth: 2,
                          // Set border Hex Color Code Here.
                          borderColor: '#F7F7F7',
                          // Setting up Text Font Color.
                          
                          // Setting Up Background Color of Text component.
                          backgroundColor : 'white',
                          // Adding padding on Text component.
                          padding : 2,
                         
                          margin: 10,
                          alignItems:'center'
                        }}>
                        <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Fecha</Text>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:10,marginBottom:10}}>Creación:</Text>
                          <DatePicker
                            style={{width: 160,marginLeft:13,marginRight:15,marginTop:5,marginBottom:5}}
                            date={this.state.creacionDate}
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
                            onDateChange={(datetime:any) => {this.setState({creacionDate: datetime});}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:10,marginBottom:10}} >Expiración:</Text>
                          <DatePicker
                            style={{width: 160, marginLeft:2,marginRight:15}}
                            date={this.state.expiracionDate}
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
                            onDateChange={(date:any) => {this.setState({expiracionDate: date});}}
                            />
                        </View>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{ marginRight:5,marginTop:14,marginBottom:14}}>Aviso:</Text>
                          <View style={{width:200,marginLeft:2,marginRight:15,marginTop:0,marginBottom:0}}>
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
                                  <Picker.Item label="Al Momento" value="Al Momento" />
                                  <Picker.Item label="Ninguno" value="Ninguno" />
                                  <Picker.Item label="1 minuto" value="1 minuto" />
                                  <Picker.Item label="5 minutos" value="5 minutos" />
                                  <Picker.Item label="15 minutos" value="15 minutos" />
                                  <Picker.Item label="30 minutos" value="30 minutos" />
                                  <Picker.Item label="1 hora" value="1 hora" />
                                  <Picker.Item label="2 horas" value="2 horas" />
                                </Picker>
                            </Item>
                          </View>
                        </View>
                      </View>
                    <View
                        style={{
                          flexDirection: 'column',
                          height: 100,
                          // Set border width.
                          borderWidth: 2,
                          // Set border Hex Color Code Here.
                          borderColor: '#F7F7F7',
                          // Setting up Text Font Color.
                         
                          // Setting Up Background Color of Text component.
                          backgroundColor : 'white',
                          // Adding padding on Text component.
                          padding : 2,
                         
                          margin: 10,
                          alignItems:'center'
                        }}>
                        <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Grupo</Text>
                        <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <CheckBox
                            containerStyle={{marginRight:5,marginTop:10,marginBottom:10}}
                            title='Publicar'
                            size={17}
                            textStyle={{fontSize:12,fontWeight:'normal'}}
                            checked={this.state.checked}
                            onPress={() => this.setState({checked: !this.state.checked,enabled: !this.state.enabled})}
                          />
                          <View style={{width:140}}>
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
                    <View
                      style={{
                        flexDirection: 'column',
                        height: 340,
                        // Set border width.
                        borderWidth: 2,
                        // Set border Hex Color Code Here.
                        borderColor: '#F7F7F7',                        // Setting Up Background Color of Text component.
                        backgroundColor : 'white',
                        // Adding padding on Text component.
                        padding : 2,
                        margin: 10,
                      }}>
                      <Text style={{fontWeight: 'bold',textAlign:'center',alignItems:'center'}}>Detalles</Text>
                      <View style={{ flexDirection: 'column',alignItems:'center'}}>
                        <View  style={{ flexDirection: 'row',alignItems: 'flex-start'}}>
                          <Text style={{marginLeft:5,marginTop:16,marginBottom:16}}>Creador :</Text>
                          <Text style={{fontWeight: 'bold',marginTop:16,marginBottom:16}} >{usuario}</Text>
                        </View >
                        <View style={{ flexDirection: 'row',width:200}}>
                        <Text style={{marginLeft:10,marginTop:16,marginBottom:16}}>Tipo:</Text>
                        <View style={{flex:1,marginRight:5,marginTop:1,marginBottom:1,alignItems:'flex-end'}}>
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
                                <Picker.Item label="Llamada" value="LLAMADA" />
                                <Picker.Item label="Reunión" value="REUNION" />
                                <Picker.Item label="Correo" value="CORREO" />
                                <Picker.Item label="Otro" value="OTRO" />
                              </Picker>
                          </Item>
                          </View>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginLeft:22,marginRight:5,marginTop:14,marginBottom:14}}>Asunto :</Text>
                          <Textarea onChangeText={(asunto) => this.setState({asunto})} value={this.state.asunto} rowSpan={1} style={{marginRight:5,marginTop:10,marginBottom:10,color: '#616161',height:40,flex:1,borderWidth: 2,borderColor: '#F7F7F7',}} placeholder="" />
                      </View>
                      <View style={{ flexDirection: 'row',alignItems:'flex-start'}}>
                          <Text style={{marginRight:5,marginTop:14,marginBottom:14}}>Contenido :</Text>
                          <Textarea  onChangeText={(contenido) => this.setState({contenido})} value={this.state.contenido} rowSpan={4} style={{marginRight:5,marginTop:10,marginBottom:10,color: '#616161',height:130,flex:1,borderWidth: 2,borderColor: '#F7F7F7',}} placeholder="" />
                      </View>
                  </View>
                    <Button rounded block info  style={styles.button} onPress={this.crearTarea} >
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
    margin: 120,
    marginBottom:10, 
    marginTop: 10,
    backgroundColor:'#70CCF6'
  }
});
export default CrearTareaScreen;