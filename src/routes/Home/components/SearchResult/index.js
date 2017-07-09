import React from 'react'
import {Text
} from 'react-native'
import { View, List,ListItem,InputGroup, Input,Left ,Body,Right} from "native-base";
//import {View} from 'native-base'

import Icon from "react-native-vector-icons/MaterialIcons";

import styles from "./SearchResultStyles.js";


export const SearchResult = ({predictions,getSelectedAddress}) =>{
 
    return(
			<View style={styles.searchResultsWrapper} >
				<List 
					dataArray={predictions}
					renderRow={(item)=>
						<View>
							<ListItem button avatar onPress={()=>getSelectedAddress(item.placeID)}>
								<Left style={styles.leftContainer}>
									<Icon style={styles.leftIcon} name="location-on" />
								</Left>
								<Body>
									<Text style={styles.primaryText}>{item.primaryText}</Text>
									<Text style={styles.secondaryText}>{item.secondaryText}</Text>
								</Body>
							</ListItem>
						</View>
					}
				/>
			</View>

		);
    // return (
    //     <View style={styles.searchResultsWrapper}>
    //        <List
    //        dataArray ={predictions}
    //        renderRow={(item) =>
    //          <View>
    //            <ListItem button avatar>
    //             <Left style={styles.leftContainer}>
    //               <Icon style ={styles.leftIcon} name="location-on"/>
    //             </Left>
    //             <Body>
    //               <Text style ={styles.primaryText}>{item.primaryText}</Text>
    //                <Text style ={styles.secondaryText}>{item.secondaryText}</Text>
    //             </Body>
    //         </ListItem>
    //          </View>
    //        }
    //        >
    //       </List>
           
    //     </View>
    // )
    

    

}

export default SearchResult;

