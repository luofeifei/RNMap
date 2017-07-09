import React, { Component, PropTypes } from "react";
import {Text} from 'react-native'
import { Router} from "react-native-router-flux";

 import scenes from "../routes/scenes";

 import { Provider,connect } from "react-redux";

// const scenes = Actions.create(
//   <Scene key="root">
//       <Scene key="home" component={Home} title="home" initial={true} />
//   </Scene>
// )

export default class AppContainer extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }
  render(){
    return (

      <Provider store={this.props.store}>
        <Router scenes={scenes} />
      </Provider>
      );
  }
}
