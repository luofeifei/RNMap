import React from 'react';
import {Image} from 'react-native';
import {Header,Left, Body, Right, Button, Title} from 'native-base';
import styles from './HeaderComponentStyles'
import Icon from "react-native-vector-icons/FontAwesome";
export const HeaderComponent = ({log})=>{
    return(
        <Header iosBarStyle='light-content' style={{backgroundColor:'#FF5E3A'}}>
          <Left>
            <Button transparent>
              <Icon name='bars' style={styles.icon}/>
            </Button>
          </Left>
          <Body>
            <Image resizeMode="contain" style={styles.logo}  source={log}/>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='gift' style={styles.icon}/>
            </Button>
          </Right>
        </Header>
    )
}
export default HeaderComponent;