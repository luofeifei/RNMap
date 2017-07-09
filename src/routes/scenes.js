import React from "react";
import {
	StyleSheet,
	Text,
	View
} from "react-native";
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from "./Home/containers/HomeContainer";

const styles = StyleSheet.create({
    container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:'#bb0000'
	},
    welcome:{
        textAlign:'center',
		margin:10,
		color:'#fff'
    }
})

const style1s =StyleSheet.create({
    container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center",
		backgroundColor:'#bb0000'
	},
    welcome:{
        textAlign:'center',
		margin:10,
		color:'#000'
    }
})

const ScarletScreen = () =>{
	return(
		<View style={styles.container}>
           <Text style={styles.welcome} 
		   onPress={() => Actions.gray()}
		   >
			   hhhhhhhh
		   </Text>
		</View>
	)
}

const GrayScreen = () =>{
	return(
		<View style={style1s.container}>
           <Text style={style1s.welcome} 
		       onPress={() => Actions.scarlet()}
		   >
			   yyyyyyyyyyy
		   </Text>
		</View>
	)
}

const scenes = Actions.create(
	<Scene key="root" hideNavBar>
		{/*<Scene key="home" component={HomeContainer} title="home"  />*/}
		<Scene key="scarlet" component={ScarletScreen} title="scarlet" initial/>
		<Scene key="gray" component={GrayScreen} title="gray" />
	</Scene>

);




export default scenes;