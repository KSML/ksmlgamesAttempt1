import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button, FlatList} from 'react-native';





export default class StartUI extends Component {
    constructor(props){
        super(props)
        this.state = {
            master: undefined,
            page: "start",
            playerName: undefined,
            password: undefined,
            tableName: undefined,
            userInput: undefined,
            webResponse: ' '
        };
        this.getRequest = this.getRequest.bind(this)
        
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeTableName = this.onChangeTableName.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.onChangePlayerName = this.onChangePlayerName.bind(this)
        
        this.HeartsPressed = this.HeartsPressed.bind(this)
        this.HighCardPressed = this.HighCardPressed.bind(this)
        
        this.create = this.create.bind(this)
        this.join = this.join.bind(this)
    }
    
    HeartsPressed(){
        
    }
    
    HighCardPressed(){
        
    }
    
    
    
    
    
    onChangeTableName(){
        
    }
    
    onChangePassword(){
        
    }
    
    onChangePlayerName(){
        
    }

    
    getRequest(input,doWriteResponse){
        // sets webResponse to whatever is returned from the server
        // while the server is responding webPending is set to true
        // 'input' passed to getRequest is used to determine the parameters of the request

        this.setState({webPending:true});
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                if (doWriteResponse) this.setState({webResponse:xmlHttp.responseText});
            }
        }.bind(this);
        xmlHttp.open("GET","https://ksmlgames3.herokuapp.com?"+input,true);
        xmlHttp.send(null);
    }

    onSubmit(){
//        this is old code! change this!
        
        if (this.state.page == 1){
            this.setState({page: this.state.page+1, userName: this.state.userInput})
        }
        else if (this.state.page == 2){
            this.setState({page: this.state.page+1, roomName: this.state.userInput})
            func = this.getRequest
            roomName = this.state.userInput // can use roomName because setState is async
            window.setInterval(function(){
                // func("func=read&tableID="+this.state.roomName+"&start=0&length=1000",true)
                func("func=read&tableID="+roomName+"&start=0&length=1000",true)
            },500);
        }
        else{
            input = this.encode(this.state.userInput)
            this.getRequest('func=append&tableID='+this.state.roomName+'&input='+input,false)
        }
    }





    join(){
        this.setState({master: false, page: "join"})
    }
    
    create(){
        this.setState({master: true, page: "create"})
    }

    render(){
        if (this.state.page == "start"){
            return(
                <View style={{padding: 30}}>
                    <Button title="Create Game" onPress={() => this.create()}/>
                    <Button title="Join Game" onPress={() => this.join()}/>
                </View>
            )
        }
        else if (this.state.page == "join"){
            return(<View style={{padding: 30}}>
                    <Text>master: {this.state.master?"True":"False"}</Text>
                    <Text>Enter Table Name: </Text>
                    <TextInput
                        placeholder = "enter table name here"
                        onChangeText = {this.onChangeTableName}
                        onSubmitEditing = {() => {}}/>
                    <Text>Enter Password: </Text>
                    <TextInput
                        placeholder = "enter password here"
                        onChangeText = {this.onChangePassword}
                        onSubmitEditing = {() => {}}/>
                    <Text>Enter Player Name: </Text>
                    <TextInput
                        placeholder = "enter player name here"
                        onChangeText = {this.onChangePlayerName}
                        onSubmitEditing = {() => {}}/>
                    <Button title="Submit" onPress={() => this.onSubmit()}/>
                </View>)
        }
        else if (this.state.page == "create"){
            return(<View style={{padding: 30}}>
                    <Text>master: {this.state.master?"True":"False"}</Text>
                    <Text>Enter Table Name: </Text>
                    <TextInput
                        placeholder = "enter table name here"
                        onChangeText = {this.onChangeTableName}
                        onSubmitEditing = {() => {}}/>
                    <Text>Enter Password: </Text>
                    <TextInput
                        placeholder = "enter password here"
                        onChangeText = {this.onChangePassword}
                        onSubmitEditing = {() => {}}/>
                    <Text>Enter Player Name: </Text>
                    <TextInput
                        placeholder = "enter player name here"
                        onChangeText = {this.onChangePlayerName}
                        onSubmitEditing = {() => {}}/>
                    <Button title="Submit" onPress={() => this.onSubmit()}/>
                    <Text>Choose a game</Text>
                    <FlatList
                        data={[{key: 'Hearts'},
                              {key: 'HighCard'},
                              ]}
                        renderItem = {({item}) => <Text>{item.key}</Text>}
                    />
                </View>)
        }
        else if (this.state.page == "invalid Credentials"){
            return (
                <View style={{padding: 30}}>
                </View>
            );
        }
        else{
            return (
                <View style={{padding: 30}}>
                    <Text>ERROR</Text>
                </View>
            )
        }
        
    }
}















