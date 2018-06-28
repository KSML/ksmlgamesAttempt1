import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button, FlatList} from 'react-native';

import Game1 from '../Game1/Game1';
import Game2 from '../Game2/Game2';


export default class Scroll extends Component {
    constructor(props){
        super(props)
        this.state = {page: 1, Game: <Text>ERROR</Text>}
        this.scrollPressed = this.scrollPressed.bind(this)
    }
    
    scrollPressed(input){
        if (input == "Game1") x = <Game1/>
        else if (input == "Game2") x = <Game2/>
        else x = <Text>ERROR</Text>
        this.setState({page:this.state.page+1, Game:x})
    }

    render(){
        if (this.state.page == 1){
            return(
                <View style={{padding: 30}}>
                    <FlatList
                        data = {[{key: 'Game1'},{key: 'Game2'}]}
                        renderItem={({item}) => <Text onPress={() => this.scrollPressed(item.key)}>{item.key}</Text>}
                    />
                </View>
            )
        }
        else {
            return(
                <View style={{padding: 30}}>
                    <Text>{this.state.Game}</Text>
                </View>
            )
        }
    }
}









