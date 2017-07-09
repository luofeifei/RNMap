import React from 'react';
import {Image} from 'react-native';
import {Footer,FooterTab, Button, Text} from 'native-base';
import styles from './FooterComponentStyles'
import Icon from "react-native-vector-icons/FontAwesome";
export const FooterComponent = ()=>{
    const tabs =[{
      title:'TaxiCar',
      subTitle:'',
      icon:'car'
    },{
      title:'TaxiShare',
      subTitle:'',
      icon:'car'
    },{
      title:'TaxiPremium',
      subTitle:'',
      icon:'car'
    },{
      title:'TaxiBike',
      subTitle:'',
      icon:'car'
    }]
    return(
      <Footer>
          <FooterTab style={styles.footerContainer} >
            {
              tabs.map((item,index)=>{
                return (
                  <Button key={index} vertical>
                    <Icon size={20} name={item.icon}  style={{color:(index==0)?"#FF5E3A":"gray"}}/>
                    <Text style={{fontSize:12,color:(index==0)?"#FF5E3A":"gray"}}>{item.title}</Text>
                    <Text style={styles.subText}>{item.subTitle}</Text>
                  </Button>
                )
              })
            }
            
          </FooterTab>
      </Footer>    
    )
}
export default FooterComponent;