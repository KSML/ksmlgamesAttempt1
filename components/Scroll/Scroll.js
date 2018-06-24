import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button, FlatList, asdf} from 'react-native';

export default class Scroll extends Component {
    constructor(props){
        super(props)
    }


    render(){
        return(
            <View style={{padding: 30}}>
                <FlatList
                    data={[{key: 'a'},
                    {key: 'b'}
                    ]}
				  renderItem={({item}) => <Text>{item.key}</Text>}
				/>
            </View>
        )


    }
}
