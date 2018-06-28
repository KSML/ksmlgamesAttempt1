import React, {Component} from 'react';
import { AppRegistry, Text, View} from 'react-native';



export default class Test2 extends Component {
    constructor(props){
        super(props)
    }
    
    
    

    render(){
        return(
            <View style={{padding: 30}}>
                <Text>variable: {this.props.func()}</Text>
            </View>
        )
    }
}









