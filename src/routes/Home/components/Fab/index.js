import React from "react";
import {Text} from "react-native";
import { View, Button } from "native-base";

import styles from "./FabStyles.js";

export const Fab = ({onPressAction})=>{
	return (
		<Button style={styles.fabContainer} onPress={ ()=>{onPressAction()}}>
			<Text style={styles.btnText}> 预定 </Text>
		</Button>

	);
}

export default  Fab;