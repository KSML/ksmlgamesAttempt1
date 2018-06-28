import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button, FlatList} from 'react-native';

import Test2 from './Test2';

export default class Test1 extends Component {
    constructor(props){
        super(props)
        this.state = {var:"asdf"}
        this.func = this.func.bind(this)
    }
    
    func(){
        x = this.state.var
        return x
    }
    
    
    render(){
        return (
            <View style={{padding: 30}}>
                <Test2 func = {this.func}/>
            </View>
        );
    }
}

