import React,{Component} from 'react'
import {
    StyleSheet,
    SectionList,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Alert
 } from "react-native";
 import { StackNavigator, NavigationScreenProp } from 'react-navigation';
import Collapsible from 'react-native-collapsible'; // 0.10.0
import { Container, Content, List, ListItem, Accordion, Button, Icon, Text, Item  } from "native-base";
let routes = ["Home", "Links", "Settings"];
let sections = [
    {
      title: 'Operaciones',
      data: [
        'Home',
        'Settings',
        'Links', 
      ],
    },
    {
      title: 'Consultas',
      data: [
        'Home',
        'Settings',
        'Links', 
      ],
    },
    {
      title: 'Transacciones',
      data: [
        'Home',
        'Settings',
        'Links', 
      ],
    },
  ];
export interface MenuDrawerProps {
    navigation: NavigationScreenProp<any,any>
};
export default class MenuDrawer extends React.Component<MenuDrawerProps,any>{
    state = {
        activeSection: 'none',
      };
      onPress = section => {
        this.setState({
          activeSection: this.state.activeSection === section.title
            ? ''
            : section.title,
        });
      };
    render(){
        return (
                <Container  style={styles.container}>
                <Content>
                    <Image
                        source={require('../../assets/cover.png')}
                        style={{
                        height: 120,
                        alignSelf: "stretch",
                        justifyContent: "center",
                        alignItems: "center"
                        }}>
                    </Image>
                    <SectionList
                    sections={sections}
                    keyExtractor={a => a}
                    renderSectionHeader={({ section }) => (
                        <Text style={styles.estilo} onPress={() => this.onPress(section)} >
                            <Text style={styles.header}>{section.title}</Text>
                        </Text>
                    )}
                    renderItem={({ item, section }) => (
                        <Collapsible
                        key={item}
                        collapsed={section.title !== this.state.activeSection}>
                        <Text style={styles.item} onPress={() => this.props.navigation.navigate(item)} >{item}</Text>
                        </Collapsible>
                    )}
                    />
                </Content>
                </Container>
        )
    }
}
const styles = StyleSheet.create({
    header: {
      fontSize: 18,
      backgroundColor: '#304059',
      color:'white',
      fontWeight: 'bold',
    },
    estilo:{
      paddingHorizontal:15,
      paddingVertical: 3,
    },
    container:{
      backgroundColor: '#304059',
    },
    item: {
      fontSize: 16,
      backgroundColor: '#304059',
      color:"white",
      paddingHorizontal: 30,
      paddingVertical: 8,
    },
  });