import { createSwitchNavigator, createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import ChatScreen from '../screens/ChatScreen';
import AvisoScreen from '../screens/AvisoScreen';
import AgendaScreen from '../screens/AgendaScreen';
import HomeScreen from '../screens/HomeScreen';
import AlertaScreen from '../screens/AlertaScreen';
import MessagesScreen from '../screens/MessagesScreen';
import EnviarMensajeScreen from '../screens/EnviarMensajeScreen';
import LoadingScreen from '../screens/LoadingScreen';
//import DrawerNavigator from './DrawerNavigator';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const MainNavigator= createStackNavigator(
  {
      Home:{
          screen: HomeScreen
      },
      Messages:{
          screen: MessagesScreen
      },
      Aviso:{
          screen: AvisoScreen
      },
      Agenda:{
          screen: AgendaScreen
      },
      Alerta:{
          screen: AlertaScreen
      },
      Login:{
          screen: LoginScreen
      },
      Chat:{
        screen: ChatScreen
      },
      EnviarMensaje:{
        screen: EnviarMensajeScreen
      }
      
  },
  {
    headerMode: 'none'
  }
)
const AppStack = MainNavigator;
const AuthStack = createStackNavigator({ Login: LoginScreen},{headerMode:'none'});
export default createAppContainer(createSwitchNavigator(
  {
    //AuthLoading: AuthLoadingScreen,
    AuthLoading: LoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));