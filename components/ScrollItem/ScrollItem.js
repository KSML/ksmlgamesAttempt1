import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button, FlatList, asdf} from 'react-native';

export default class ScrollItem extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <View>
                <Text>{this.props.name}</Text>
            </View>
        )
    }
    
}

