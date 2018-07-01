import React, {Component} from 'react'
import {AppRegistry, Text, View, Button, TextInput} from 'react-native'

import StartUI from './components/StartUI/StartUI'

export default class myapp extends Component{
	render(){
		return(
			<StartUI/>
		);
	}
}

// skip this line if using Create React Native App
AppRegistry.registerComponent('myapp',() => myapp);

