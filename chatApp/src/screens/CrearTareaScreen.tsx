import React from 'react';
import { Container, Header, Content, Form, Item, Input, Button,Left,Icon,Body,Right,Title,Text,Label, Textarea, Picker } from 'native-base';
import {View,StyleSheet,FlatList, AsyncStorage, Alert} from 'react-native'
import api from '../api';
import DatePicker from 'react-native-datepicker';
import localstorage from '../localstorage';
import { CheckBox } from 'react-native-elements'
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import { BaseResponse } from '../entidades/BaseResponse';
import { Login } from '../entidades/login';
import { SysGrupo } from '../entidades/SysGrupo';
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
    id?:String;
    usuario?:String;
}
let API = new api();
let LOCALSTORAGE = new localstorage();
let config={}
let config2={}
let config3={}
let token=""
let refresh=""
class CrearTareaScreen extends React.Component<Props,state> {
    constructor(props: Props){
      super(props);
      this.state = {usuario:'', id:'',asunto:'',contenido:'',expiracionDate:'2019-06-20',creacionDate: "2019-06-20",selectedAviso:'Al Momento',selectedGrupo:'',selectedTipo:'LLAMADA',checked: false,enabled: false,macADD:'',token: '',refresh:'' };
      this.setDateCreacion = this.setDateCreacion.bind(this);
      this.setDateExpiracion = this.setDateExpiracion.bind(this);
      DeviceInfo.getMACAddress().then(mac => {
        // "E5:12:D8:E5:69:97"
        this.setState({macADD:mac})
      });
      //this.upDateToken()
    }
    //obtiene mac
    //actualiza el token,refresh,id,usuario obteniendolo del local storage 
    upDateToken(){
      return new Promise((resolve, reject) => {
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
        LOCALSTORAGE.getIdUsuario().then(response=>{
          console.log(response)
          this.setState({id:response})
          console.log(this.state.id)
        })
        LOCALSTORAGE.getUsuario().then(response=>{
          console.log(response)
          this.setState({usuario:response})
          console.log(this.state.usuario)
          resolve();
        })
      });
    }
    //actualiza variables cuando se monta el componentev
    componentDidMount(){
      //carga el estado para despues hacer la peticion de los grupos
      this.upDateToken().then(res => this.getGrupoUsuario());
      //this.getGrupoUsuario()
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
                          <Text style={{fontWeight: 'bold',marginTop:16,marginBottom:16}} >{this.state.usuario}</Text>
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
    //validaciones
    crearTarea=()=>{
          //validaciones
          if (this.state.asunto==""){
            this.mensajeShow("Ingrese asunto",1)
          } else if (this.state.contenido==""){
            this.mensajeShow("Ingrese Contenido",1)
          } else{
            //hacer peticion
            console.log('aqui lo llamo es amadre')
            this.peticion()
          }
    }
        //peticion para hacer el refresh por que se vencio el token
    //si el status es 200 entonces llama otra funcion  para actualizar los tokens
    //si es 400 significa que ya se venció el refresh tambien y procede a mostrar el porque y cierra sesión automaticamente
    refresh(peticion:any){
      API.sesion('refresh',config2)
    .then(response => {
      const parsedJSON = response;
      var login: Login[] = parsedJSON as Login[];
      //console.log('MESSAGE: ' +login.message);
      //console.log('STATUS: ' +login.status);
      //console.log('TOKEN: ' +login.resp);
      if (String(login.status)=='200'){
        token=login.resp.token
        refresh=login.resp.refresh
        console.log('en el refresh')
        this.refreshCorrecto(peticion)
      }else if (String(login.status)=='400'){
        this.mensajeShow(login.message,login.status)
      }
    })
    .catch(error => this.mensajeShow(error.response.message,error.response.status))
    }
    //actualiza los tokens en el local storage y despues en el mismo componente
    refreshCorrecto(peticion:any){
      LOCALSTORAGE.setToken(token)
      LOCALSTORAGE.setRefresh(refresh)
      console.log(peticion+'refreshCorrecto')
      if(peticion==1){
        //carga el estado para despues hacer la peticion del insert
        this.upDateToken().then(res => this.peticion());
      } else if (peticion==2){
        //carga el estado para despues hacer la peticion de los grupos
        this.upDateToken().then(res => this.getGrupoUsuario());
      }
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
    //muestra mensajes/alertas dependiendo de status ya sea de peticion o de validacion
    mensajeShow = (mensaje:any,status:any,peticion?:any)=>{
      if (status==1){
        Alert.alert(
          "Error de validación",
          mensaje,
          [
            {text: 'OK', 
            onPress: () => ""},
          ],
          {cancelable: false},
        );
      } else if (status==200){
        Alert.alert(
          "Tarea agregada exitosamente",
          mensaje,
          [
            {text: 'OK', 
            onPress: () => this.limpiar()},
          ],
          {cancelable: false},
        );
      }else if(status==300){
        Alert.alert(
          'Inicio de Sesión',
          mensaje,
          [
            {text: 'OK', onPress: () => 'cerrar'},
          ],
          {cancelable: false},
        );
      }else if (status==400){
        Alert.alert(
          "Error",
          mensaje,
          [
            {text: 'OK', 
            onPress: () =>this.salir()},
          ],
          {cancelable: false},
        );
      }else if (status==401){
        //Alert.alert(
          //"Error",
          //mensaje,
          //[
            //{text: 'OK', 
            //onPress: () =>  this.refresh()},
          //],
          //{cancelable: false},
        //);
        console.log('entro en 401')
        if (peticion==1){
          this.refresh(1)
        }else if (peticion==2){
          this.refresh(2)
        }
      }else if(status==500){
        Alert.alert(
          'Inicio de Sesión',
          mensaje,
          [
            {text: 'OK', onPress: () => 'cerrar'},
          ],
          {cancelable: false},
        );
      }
    }
    //se vencio la sesión por lo tanto se redirigera a iniciar sesión
    salir=()=>{
      LOCALSTORAGE.borrarSesion()
      this.props.navigation.navigate("Login")
    }
    //limpiar variable cuando ya se agrego correctamente
    limpiar=()=>{
      this.setState({
        asunto:'',
        contenido:''
      })
    }
    //realiza la petición para hacer el insert de la tarea
    peticion=()=>{
      console.log('entro en peticion')
      let data:any={
        "asunto": this.state.asunto,
        "contenido": this.state.contenido,
        "descartada": 0,
        "fechaCreacion": this.state.creacionDate,
        "fechaExpiracion": this.state.expiracionDate,
        "fechaRecordatorio": '2019-06-28',
        "leido":0,
        "tipo": this.state.selectedTipo,
        "creador":{
          "id": this.state.id
        },
        "destinatario": {
          "id":1
        },
      }
      API.insert('SysTareaRest',data,config)
      .then(response => {
      const parsedJSON = response;
      var baseResponse: BaseResponse[] = parsedJSON as BaseResponse[];
      console.log(baseResponse.status);
      this.mensajeShow("Asunto: "+this.state.asunto+"\nContenido: "+this.state.contenido + "\nFecha Expiración: "+this.state.expiracionDate,baseResponse.status)
      })
      .catch(error => this.mensajeShow(error.message,error.status,1))
    }
    getGrupoUsuario(){
      config3 = {
        headers: { 'tenantId':'macropro','Content-Type': 'application/json','Authorization': 'Bearer '+this.state.token,'MacAddress':this.state.macADD,'id':this.state.id}
      }
      console.log('token: '+this.state.token +" mac: "+ this.state.macADD+" id: "+this.state.id)
      API.getAllGrupo('UsuarioRest/getById',config3)
      .then(response => {
        const parsedJSON = response;
        //var sysGrupo: SysGrupo[] = parsedJSON as SysGrupo[];
        //console.log('MESSAGE: ' +baseResponse.message);
       // console.log('STATUS: ' +baseResponse.status);
       // console.log('Resp: ' +baseResponse.resp);
       //console.log(parsedJSON)
        //this.mensajeShow(baseResponse.message,baseResponse.status)
        //this.mensajeShow(login.message,login.status)
      })
      .catch(error =>this.mensajeShow(error.message,error.status,2))
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