import SockJS from 'sockjs-client';
//import Stomp from "@stomp/stompjs"
import Stomp from 'stompjs'
//let session=Stomp
export default class SessionWebSocket {
    private static instance: SessionWebSocket;
    private session:any;
    
    //private  suscriptions:any;
    private constructor() {
      // Crear el cliente de websocket puro
       //WebSocketClient simpleWebSocketClient = new StandardWebSocketClient();
       //List<Transport> transports = new ArrayList<>(1);
       //transports.add(new WebSocketTransport(simpleWebSocketClient));
       
       // Crear el cliente SockJS
       let sockJsClient = new SockJS('http://10.10.1.82:8008/connect');
       console.log('Si entro')
       // Crear el cliente STOMP e indicarle que convertidor de mensajes utilizar
       let stompClient =  Stomp;
       //stompClient.setMessageConverter(new MappingJackson2MessageConverter());
      //StompSessionHandler sessionHandler = new MyStompSessionHandler();

       //String url = "ws://" + rutaUri +  ":" + RutasConexion.puertoRutaUri + "/connect";
       // Crear los headers que se van a mandar para que el servidor acepte la conexion
       //WebSocketHttpHeaders headers = new WebSocketHttpHeaders();
       //headers.add("tenantId", TENANT_ID);
       //headers.add("MacAddress", MyInterceptor.getMac());
       //headers.add("authorization", "Bearer " + TOKEN);
       this.session = stompClient.over(sockJsClient);
       //this.suscriptions = [];
    }
    static getInstance() {
      if (SessionWebSocket.instance == null || SessionWebSocket.instance==undefined) {
        SessionWebSocket.instance = new SessionWebSocket();
        //SessionWebSocket.instance.session = null;
        //SessionWebSocket.instance.suscriptions=[]
      }
      return SessionWebSocket.instance;
    }
    subscribe(topic:any,id:any) {
      return new Promise((resolve, reject) => {
      this.session.subscribe(topic, function (hello:any) {
        const incomingMessage:any = {
          _id:(JSON.parse(hello.body).id),
          text: (JSON.parse(hello.body).contenido),
          createdAt: new Date()
        }
        resolve(incomingMessage)
        },{id});
      });
      //this.suscriptions.put(topic, suscription);
    }
    unSubscribe(id:any) {
      return new Promise((resolve, reject) => {
        this.session.unsubscribe(id, function (hello:any) {
            //Alert.alert(JSON.parse(hello.body).contenido)
          // _this.showGreeting(JSON.parse(hello.body).greeting);
          resolve()
        });
      }); 
      //this.suscriptions.put(topic, suscription);
    }
    connect() {
      return new Promise((resolve, reject) => {
      this.session.connect({}, function (frame:any) {
        resolve()
      },function(error:any){
        reject(error)
        }); 
      });  
    }

     isConnected():Boolean {
        return this.session.connected;
    }

    getSessionId():String {
        return this.session.getSessionId();
    }
    disconnect() {
      this.session.disconnect();
    }
  }