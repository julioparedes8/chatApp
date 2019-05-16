import React from 'react'
import {NavigationScreenProp } from 'react-navigation';
import { Container, Content, List,Footer,FooterTab, ListItem, Accordion, Button, Icon,Left,Right, Text, Item  } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';
export interface Props {
}
export default class NewMessageComponent extends React.Component<Props>{
    constructor(props: Props){
        super(props);
      }
    render(){
        return (
            <Button
                transparent
                  >
                <Icon type="Entypo" name="new-message" />
              </Button>
        )
    }
  }