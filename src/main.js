import React from "react";
import {Text} from 'react-native'

 import createStore from "./store/createStore";
 import AppContainer from "./AppContainer";
export default class Root extends React.Component{
  renderApp(){
    const initialState = window.___INTITIAL_STATE__;
    const store = createStore(initialState);
   
    return (
       <AppContainer store={store} />
       //<Text>hello1</Text>
    );
  }

  render(){
    return this.renderApp();
  }
}