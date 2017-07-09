import React from 'react'
import {Text
} from 'react-native'
import { View, InputGroup, Input } from "native-base";
//import {View} from 'native-base'

import styles from "./SearchBoxStyles.js";

import Icon from "react-native-vector-icons/FontAwesome";

export const SearchBox = ({
	getInputData,
	toggleSearchResult,
	getAddressPredictions,
	selectedAddress
}) =>{
	const {selectPickUp,selectDropOff} = selectedAddress;
    function handleInput(key,val){
		getInputData({
			key,
			value:val
		});
		getAddressPredictions();
	}    
    return (
        <View style={styles.searchBox}>
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>PICK UP</Text>
					<InputGroup>
						<Icon name="search" size={15} color="#FF5E3A"/>
						<Input 
						    onFocus={()=>{toggleSearchResult('pickUp')}}
							style={styles.inputSearch}
							placeholder="Choose pick-up location"
							onChangeText={handleInput.bind(this, "pickUp")}
							value ={selectPickUp && selectPickUp.name}
						/>
					</InputGroup>
            </View>
            <View style={styles.secondInputWrapper}> 
                 <Text style={styles.label}>DROP-OFF</Text>
					<InputGroup>
						<Icon name="search" size={15} color="#FF5E3A"/>
						<Input
						    onFocus={()=>{toggleSearchResult('dropOff')}}
							style={styles.inputSearch}
							placeholder="Choose drop-off location"
							onChangeText={handleInput.bind(this, "dropOff")}
							value ={selectDropOff && selectDropOff.name}
						/>
					</InputGroup>
            </View>
        </View>
    )
    

    

}

export default SearchBox;

