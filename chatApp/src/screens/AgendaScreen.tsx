import React, {Component} from 'react';
import {View,StyleSheet,FlatList, AsyncStorage} from 'react-native'
import api from '../api';
import { LocaleConfig } from 'react-native-calendars';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import { Container, Header, Title, Left, Icon, Right,Footer,FooterTab, Button, Body,Item, Content,Text, Card, CardItem,Accordion,Input } from "native-base";
export interface Props {
  navigation: NavigationScreenProp<any,any>,
  };
interface State{
  items?:any
  selectedDate?: any
  cargando?: boolean
}
let API = new api();
LocaleConfig.locales['mx'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
  dayNames: ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viérnes', 'Sábado'],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vié', 'Sáb'],
  
};
LocaleConfig.defaultLocale = 'mx';
class AgendaScreen extends React.Component<Props,State> {
    constructor(props:Props){
      super(props);
      this.state={
        items:{},
        selectedDate: null,
        cargando:true
      }
    }
    loadItems(day: { timestamp: number; }) {
      this.setState({selectedDate: day});
      setTimeout(() => {
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = this.timeToString(time);
          if (!this.state.items[strTime]) {
            this.state.items[strTime] = [];
            const numItems = Math.floor(Math.random() * 5);
            for (let j = 0; j < numItems; j++) {
              //this.state.items[strTime].push({
                //name: 'Item for ' + strTime,
                //height: 80
              //});
            }
          }
        }
        //console.log(this.state.items);
        const newItems: any = {};
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        this.setState({
          items: newItems
        });
      }, 1000);
      // console.log(`Load Items for ${day.year}-${day.month}`);
    }
  
    renderItem(item: { height: string | number | undefined; name: React.ReactNode; }) {
      return (
        <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
      );
    }
  
    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}><Text></Text></View>
      );
    }
  
    rowHasChanged(r1: { name: any; }, r2: { name: any; }) {
      return r1.name !== r2.name;
    }
  
    timeToString(time: string | number | Date) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
    selected(){
      const strTime = new Date().toDateString();
      return  strTime
    }
    render(){

      return(
        <Content >
          <Agenda
            items={this.state.items}
            loadItemsForMonth={this.loadItems.bind(this)}
            //selected={'2019-05-22'}
            renderItem={this.renderItem.bind(this)}
            renderEmptyDate={this.renderEmptyDate.bind(this)}
            rowHasChanged={this.rowHasChanged.bind(this)}
             // Max amount of months allowed to scroll to the past. Default = 50
            pastScrollRange={12}
            // Max amount of months allowed to scroll to the future. Default = 50
            futureScrollRange={12}
            // markingType={'period'}
            // markedDates={{
            //    '2017-05-08': {textColor: '#666'},
            //    '2017-05-09': {textColor: '#666'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
          />
        </Content>
        )
    }
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 80,
    flex:1,
    paddingTop: 30
  }
});
  export default AgendaScreen;