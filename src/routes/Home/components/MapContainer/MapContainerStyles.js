import { StyleSheet} from 'react-native';
import {
Dimensions
} from 'react-native';

const {width, height} = Dimensions.get('window');
const styles ={
    container:{
		flex:1,
		justifyContent:"center",
		alignItems:"center"
	},
    map:{
        flex:1,
        width:width
        
    }
}

export default styles;