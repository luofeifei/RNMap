import React from "react";
import {View, Text} from "react-native";
import { Container }  from "native-base";
import MapContainer from "./MapContainer";
import HeaderComponent from "../../../components/HeaderComponent"
import FooterComponent from "../../../components/FooterComponent"
import Fare from "./Fare";
import Fab from "./Fab";


const taxiLogo = require("../../../assets/img/taxi_logo_white.png");
const carMarker = require("../../../assets/img/carMarker.png");
class Home extends React.Component{
  componentDidMount(){
    var that = this;
    this.props.setCurrentLocation();
    setTimeout(function(){
			that.props.getNearByDrivers();
		}, 1000);
  }
  render(){
    const region = {
			latitude:3.146642,
			longitude:101.695845,
			latitudeDelta:0.0922,
			longitudeDelta:0.0421
		}
    //const region = this.props.region;
      if(region.latitude){
        return(
          <Container>
            <HeaderComponent log={taxiLogo}/>
            <MapContainer 
              region={region} 
              getInputData={this.props.getInputData} 
              toggleSearchResult={this.props.toggleSearchResult}
              getAddressPredictions={this.props.getAddressPredictions}
              resultTypes ={this.props.resultTypes}
              predictions = {this.props.predictions}
              getSelectedAddress = {this.props.getSelectedAddress}
              selectedAddress = {this.props.selectedAddress}
              carMarker = {carMarker}
              nearByDrivers={this.props.nearByDrivers}
            />
            <Fab onPressAction={this.props.bookCar}/>
          
            {
              this.props.fare && <Fare fare={this.props.fare} />
            }
            <FooterComponent />
          </Container>
        );
      }else{
        //return null;
        return( <Container>
            <HeaderComponent log={taxiLogo}/>
            <MapContainer 
              region={region} 
              getInputData={this.props.getInputData} 
              toggleSearchResult={this.props.toggleSearchResult}
              getAddressPredictions={this.props.getAddressPredictions}
              resultTypes ={this.props.resultTypes}
              predictions = {this.props.predictions}
              getSelectedAddress = {this.props.getSelectedAddress}
              selectedAddress = {this.props.selectedAddress}
               carMarker = {this.props.carMarker}
              nearByDrivers={this.props.nearByDrivers}
            />
            <Fab onPressAction={this.props.bookCar}/>
          
            {
              this.props.fare && <Fare fare={this.props.fare} />
            }
            <FooterComponent />
          </Container>
        )
    }
  }
}

export default Home;