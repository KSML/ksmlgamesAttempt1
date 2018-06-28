import React, {Component} from 'react';
import { AppRegistry, Text, View} from 'react-native';

export default class Test extends Component {
    constructor(props){
        super(props)
        this.state = {var: false};
    }
    
    componentDidMount(){
        this.setState({var: true})
//        while (this.state.var == false){}
    }
    
    render(){
        return(<View style={{padding: 30}}><Text>Here</Text></View>)
    }
}
