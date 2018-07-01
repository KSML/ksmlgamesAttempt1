import React, {Component} from 'react';
import { AppRegistry, Text, Button, View} from 'react-native';

export default class Game1 extends Component {
    constructor(props){
        super(props)
    }
    
    render(){
        return(
            <View style={{padding: 30}}>
                <Text>tableName: {this.props.tableName}</Text>
                <Text>playerName: {this.props.playerName}</Text>
                <Text>gameFile: {this.props.read()}</Text>
                <Button title="append 'asdf'" onPress={() => this.props.append('asdf')}/>
                <Button title="quit" onPress={() => this.props.quit()}/>
            </View>
        )
    }
}
