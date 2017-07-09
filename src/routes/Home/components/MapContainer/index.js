import React from 'react'

import {
View,
Dimensions
} from 'react-native'

import MapView from 'react-native-maps'
import SearchBox from '../SearchBox'
import SearchResult from "../SearchResult";

import styles from "./MapContainerStyles.js";

const MapContainer =({
    region,
    getInputData,
    resultTypes,
    toggleSearchResult,
    getAddressPredictions,
    predictions,
    selectedAddress,
    getSelectedAddress,
    carMarker,
    nearByDrivers
})=>{
    console.log('carMarker--',carMarker);
    const { selectPickUp, selectDropOff } = selectedAddress || {};

   return (
        
        <View style={styles.container}>

            <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion = {region}
            >
                
				{ selectPickUp &&
					<MapView.Marker
						coordinate={{latitude:selectPickUp.latitude, longitude:selectPickUp.longitude}}
						pinColor="green"

					/>	
				}
				{ selectDropOff &&
					<MapView.Marker
						coordinate={{latitude:selectDropOff.latitude, longitude:selectDropOff.longitude}}
						pinColor="blue"

					/>	
				}
                {
					nearByDrivers && nearByDrivers.map((marker, index)=>
						<MapView.Marker
							key={index}
							coordinate={{latitude:marker.coordinate.coordinates[1], longitude:marker.coordinate.coordinates[0] }}
							image={carMarker}
						/>	
					)
				}
            </MapView>
            <SearchBox 
                getInputData={getInputData} 
                toggleSearchResult = {toggleSearchResult}
                getAddressPredictions ={getAddressPredictions}
                selectedAddress={selectedAddress}
            />
            { (resultTypes.pickUp || resultTypes.dropOff) &&
			<SearchResult predictions={predictions} getSelectedAddress={getSelectedAddress} />
			}
        </View>
    )
       

    

}
export default  MapContainer;
