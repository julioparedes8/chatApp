import SockJS from 'sockjs-client';
import Stomp from 'stompjs'
//let session=Stomp
export default class SessionWebSocket {
    private static instance: SessionWebSocket;
    private session:any;
    private constructor() {
       let sockJsClient = new SockJS('http://10.10.1.82:8008/connect');
       console.log('Si entro')
       let stompClient =  Stomp;
       this.session = stompClient.over(sockJsClient);
    }
    static getInstance() {
      if (SessionWebSocket.instance == null || SessionWebSocket.instance==undefined) {
        SessionWebSocket.instance = new SessionWebSocket();
      }
      return SessionWebSocket.instance;
    }
    subscribe(topic:any,id:any) {
      return new Promise((resolve, reject) => {
      this.session.subscribe(topic, function (hello:any) {
        resolve(JSON.parse(hello.body))
        },{id});
      });
    }
    unSubscribe(id:any) {
      return new Promise((resolve, reject) => {
        this.session.unsubscribe(id, function (hello:any) {
          resolve()
        });
      }); 
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