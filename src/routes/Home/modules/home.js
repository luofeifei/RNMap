import update from "react-addons-update";
import constants from "./actionConstants";
import { Dimensions } from "react-native";
import RNGooglePlaces from 'react-native-google-places';


import request from "../../../util/request";

import calculateFare from "../../../util/fareCalculator.js";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA

//*********** */
//Constants
//*********** */
const {
	SET_CURRENT_LOCATION,
	GET_INPUT,
	TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
	GET_SELECTED_ADDRESS,
	GET_DISTANCE_MATRIX,
	GET_FARE,
	BOOK_CAR,
	GET_NEARBY_DRIVERS
} = constants;


//*********** */
//Actions
//*********** */
export function setCurrentLocation(){
    return(dispatch)=>{
		navigator.geolocation.getCurrentPosition(
			(position)=>{
				dispatch({
					type:SET_CURRENT_LOCATION,
					payload:position
				});
			},
			(error)=> console.log(error.message),
			{enableHighAccuracy: true, timeout: 20000, maximumAge:1000}
		);
    }
}
// 获取用户输入信息
export function getInputData(payload){
    return{
		type:'GET_INPUT',
		payload
    }
}
// 触发搜索结果显示框
export function toggleSearchResult(payload){
    return{
		type:'TOGGLE_SEARCH_RESULT',
		payload
    }
}
//用户选择的地址 GET_SELECTED_ADDRESS
export function getSelectedAddress(payload){
	const dummyNumbers ={
		baseFare:0.4,
		timeRate:0.14,
		distanceRate:0.97,
		surge:1
	}
	return(dispatch,store)=>{
	   RNGooglePlaces.lookUpPlaceByID(payload)
	   .then((result)=>{
		    
			dispatch({
					type:'GET_SELECTED_ADDRESS',
					payload:result
				})
		})
		.then(()=>{
			// 获取路程和时间
		
			let flag = store().home.selectedAddress.selectPickUp && store().home.selectedAddress.selectDropOff
            console.log('flag',flag);
			if(flag){
               request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
				.query({
					origins:store().home.selectedAddress.selectPickUp.latitude + "," + store().home.selectedAddress.selectPickUp.longitude,
					destinations:store().home.selectedAddress.selectDropOff.latitude + "," + store().home.selectedAddress.selectDropOff.longitude,
					mode:"driving",
					key:"AIzaSyDUYbTR-3PDWPhgxjENs4yf35g2eHc641s"
				})
				.finish((error, res)=>{
					console.log('distancematrix--',res.body);
					dispatch({
						type:GET_DISTANCE_MATRIX,
						payload:res.body
					});
				})
			}
			setTimeout(function(){
				if(flag){
					const fare = calculateFare(
						dummyNumbers.baseFare,
						dummyNumbers.timeRate,
						store().home.distanceMatrix.rows[0].elements[0].duration.value,
						dummyNumbers.distanceRate,
						store().home.distanceMatrix.rows[0].elements[0].distance.value,
						dummyNumbers.surge,
					);
					dispatch({
						type:GET_FARE,
						payload:fare
					})
				}


			},5000)
		})
		.catch((error) => console.log(error.message));
	}
}

// 获取搜素位置信息GET_ADDRESS_PREDICTIONS
export function getAddressPredictions(){
	return(dispatch,store)=>{
       let userInput = store().home.resultTypes.pickUp?store().home.inputData.pickUp:store().home.inputData.dropOff;
	
	   RNGooglePlaces.getAutocompletePredictions(userInput,{
		   country:"MY"
	   })
	   .then((result)=>{
		   
		   dispatch({
			   type:'GET_ADDRESS_PREDICTIONS',
			   payload:result
		   })
	   })
	   .catch((error) => console.log(error.message));
	}
}
// 获取搜素位置信息GET_ADDRESS_PREDICTIONS
export function bookCar(){
	return (dispatch, store)=>{
		const nearByDrivers = store().home.nearByDrivers;
		const nearByDriver = nearByDrivers[0];
		const payload = {
			data:{
				userName:"luofeifei",
				pickUp:{
					address:store().home.selectedAddress.selectPickUp.address,
					name:store().home.selectedAddress.selectPickUp.name,
					latitude:store().home.selectedAddress.selectPickUp.latitude,
					longitude:store().home.selectedAddress.selectPickUp.latitude
				},
				dropOff:{
					address:store().home.selectedAddress.selectDropOff.address,
					name:store().home.selectedAddress.selectDropOff.name,
					latitude:store().home.selectedAddress.selectDropOff.latitude,
					longitude:store().home.selectedAddress.selectDropOff.latitude
				},
				fare:store().home.fare,
				status:"pending",
			},
			nearByDriver:{
				socketId:nearByDriver.socketId,
				driverId:nearByDriver.driverId,
				latitude:nearByDriver.coordinate.coordinates[1],
				longitude:nearByDriver.coordinate.coordinates[0],

			}

		};
        console.log('bookings--',payload);
		request.post("http://localhost:3000/api/bookings")
		.send(payload)
		.finish((error, res)=>{
			dispatch({
				type:BOOK_CAR,
				payload:res.body
			});
		});

	};
}

// 获取附近司机
export function getNearByDrivers(){
	return(dispatch, store)=>{
		request.get("http://localhost:3000/api/driverLocation")
		.query({
			latitude:3.145909,
			longitude:101.696985	
		})
		.finish((error, res)=>{
			if(res){
				dispatch({
					type:GET_NEARBY_DRIVERS,
					payload:res.body
				});
			}

		});
	};
}
//*********** */
//Action Handlers
//*********** */
function handleSetCurrentLocation(state,action){
  return update(state, {
		region:{
			latitude:{
				$set:action.payload.coords.latitude
			},
			longitude:{
				$set:action.payload.coords.longitude
			},
			latitudeDelta:{
				$set:LATITUDE_DELTA
			},
			longitudeDelta:{
				$set:LONGITUDE_DELTA
			}
		}
	})
}
function handleGetInputData(state,action){
  const {key,value} = action.payload;
  return update(state, {
		inputData:{
			[key]:{
			  $set:value
			}
		}
	})
}
function handleToggleSearchResult(state, action){
	if(action.payload === "pickUp"){
		return update(state, {
			resultTypes:{
				pickUp:{
					$set:true,
				},
				dropOff:{
					$set:false
				}
			},
			predictions:{
				$set:{}
			}

		});
	}
	if(action.payload === "dropOff"){
		return update(state, {
			resultTypes:{
				pickUp:{
					$set:false,
				},
				dropOff:{
					$set:true
				}
			},
			predictions:{
				$set:{}
			}

		});
	}

}

function handleGetAddressPredictions(state,action){
    return update(state,{
		predictions:{
			$set:action.payload
		}
	})
}
function handleGetSelectedAddress(state,action){
	let selectTitle = state.resultTypes.pickUp?"selectPickUp":'selectDropOff';
    return update(state,{
		selectedAddress:{
			[selectTitle]:{
               $set:action.payload   
			}	
		},
		resultTypes:{
			pickUp:{
				$set:false
			},
			dropOff:{
				$set:false
			}
		}
	})
}
function handleGetDistanceMatrix(state,action){
   return update(state,{
		distanceMatrix:{
               $set:action.payload   
		}
	})
}
function handleGetFare(state,action){
	return update(state,{
		fare:{
            $set:action.payload   
		}
	})
}
function handleBookCar(state,action){
	return update(state, {
		booking:{
			$set:action.payload
		}
	})
}
// 获取附近（10KM 以内）的司机
function handleGetNearbyDrivers(state, action){
	return update(state, {
		nearByDrivers:{
			$set:action.payload
		}
	});
}
const ACTION_HANDLERS = {
  SET_CURRENT_LOCATION:handleSetCurrentLocation,
  GET_INPUT:handleGetInputData,
  TOGGLE_SEARCH_RESULT:handleToggleSearchResult,
  GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
  GET_SELECTED_ADDRESS:handleGetSelectedAddress,
  GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
  GET_FARE:handleGetFare,
  BOOK_CAR:handleBookCar,
  GET_NEARBY_DRIVERS:handleGetNearbyDrivers
};
const initialState = {
	region:{},
	inputData:{},
	resultTypes:{},
	predictions:{},
	selectedAddress:{},
	distanceMatrix:{},
	booking:{},
};
export function HomeReducer (state = initialState, action){
	const handler = ACTION_HANDLERS[action.type];

	return handler ? handler(state, action) : state;
  
}