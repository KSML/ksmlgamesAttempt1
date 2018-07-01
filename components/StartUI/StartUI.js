import React, {Component} from 'react';
import { AppRegistry, Text, TextInput, View, Button, FlatList} from 'react-native';

import Game1 from '../Game1/Game1';
import Game2 from '../Game2/Game2';

export default class StartUI extends Component {
    constructor(props){
        super(props)
        this.state = {
            master: undefined,
            page: "start",
            gameFile: undefined,
            gameName: undefined,
            playerName: undefined,
            password: undefined,
            tableName: undefined,
            playing: false,
        };
        this.getRequest = this.getRequest.bind(this)
        
        this.join = this.join.bind(this)
        this.join2 = this.join2.bind(this)
        this.join3 = this.join3.bind(this)
        this.create = this.create.bind(this)
        this.create2 = this.create2.bind(this)
        this.append = this.append.bind(this)
        this.quit = this.quit.bind(this)
        this.goToGame = this.goToGame.bind(this)
    }
    
    
    create(gameNameInput){
        this.setState({gameName:gameNameInput})
        ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
        this.getRequest("func=new&tableID="+ID,this.create2)
        // do a loading symbol here
    }
    
    
    create2(response){
        ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
        if (response == "new: table in use") this.setState({gameName:"table in use"})
        else this.getRequest("func=append&input="+this.state.gameName+"&tableID="+ID,()=>{})
        // consider checking for errors
        this.goToGame()
    }
    
    
    join(){
        ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
        this.getRequest("func=new&tableID="+ID,this.join2)
        // do a loading symbol here
    }
    
    
    join2(response){
        if (response != "new: table in use"){
            this.setState({gameName:"wrong password"})
            this.goToGame()
        }
        else{
            ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
            this.getRequest("func=read&start=0&length=5&tableID="+ID,this.join3)
        }
    }
    
    
    join3(response){
        this.setState({gameName:response})
        this.goToGame()
    }
    
    
    goToGame(){
        if (this.state.gameName == "Game1"){
            game = <Game1
                master = {this.state.master}
                playerName = {this.state.playerName}
                tableName = {this.state.tableName}
                read = {() => {return this.state.gameFile}}
                append = {this.append}
                quit = {this.quit}
            />
        }
        else if (this.state.gameName == "Game2"){
            game = <Game2
                master = {this.state.master}
                playerName = {this.state.playerName}
                tableName = {this.state.tableName}
                read = {() => {return this.state.gameFile}}
                append = {this.append}
                quit = {this.quit}
            />
        }
        else if (this.state.gameName == "wrong password"){
            game = <View style={{padding: 30}}>
                <Text>Wrong Password</Text>
                <Button title="Return to Start Page" onPress={() => {this.setState({page: "start"})}}/>
            </View>
        }
        else if (this.state.gameName == "table in use"){
            game = <View style={{padding: 30}}>
                <Text>Table In Use</Text>
                <Button title="Return to Start Page" onPress={() => {this.setState({page: "start"})}}/>
            </View>
        }
        else game = <View style={{padding: 30}}><Text>unkown game: {this.state.gameName}</Text></View>
        
        this.setState({page:"gamePage", Game:game, playing:true})
    }
    
    
    append(input){
        ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
        this.getRequest("func=append&tableID="+ID+"&input="+input,()=>{})
    }
    
    
    quit(){
        ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
        if (this.state.master){
            // do get request to delete game file
            this.getRequest("func=quit&tableID="+ID,()=>{})
        }
        
        this.setState({page:"start",
                       gameFile:undefined,
                       playing:false,
                       playerName:undefined,
                       tableName:undefined,
                       password:undefined})
    }
    
    
    componentDidMount(){
        ID = "x"+this.state.password+this.state.tableName  // HASH THIS !!!
        setInterval(() => {
            if (this.state.playing){ // gameFile is only updated while playing
                newGameFile = this.getRequest("func=read&tableID="+ID+"&start=0&length=1000",
                                          (response) => this.setState({gameFile:response}))
            }
            // only doing the first 1000 chars, make this bigger if nessisary
        },1000)
    }

    
    getRequest(input,func){
        // calls func on whatever is returned from the server
        
        var xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
                func(xmlHttp.responseText)
                this.setState({webPending:false})
            }
        }.bind(this)
        xmlHttp.open("GET","https://ksmlgames3.herokuapp.com?"+input,true)
        xmlHttp.send(null)
    }
    
    
    render(){
        credentials = <View>
                        <Text>master: {this.state.master?"True":"False"}</Text>
                        <Text>Enter Table Name: </Text>
                        <TextInput
                            placeholder = "enter table name here"
                            onChangeText = {input => this.setState({tableName:input})}/>
                        <Text>Enter Password: </Text>
                        <TextInput
                            placeholder = "enter password here"
                            onChangeText = {input => this.setState({password:input})}/>
                        <Text>Enter Player Name: </Text>
                        <TextInput
                            placeholder = "enter player name here"
                            onChangeText = {input => this.setState({playerName:input})}/>
                    </View>
        
        
        if (this.state.page == "start"){
            return(
                <View style={{padding: 30}}>
                    <Button title="Create Game" onPress={() => {this.setState({master: true, page: "create"})}}/>
                    <Button title="Join Game" onPress={() => {this.setState({master: false, page: "join"})}}/>
                </View>
            )
        }
        
        else if (this.state.page == "join"){
            return(<View style={{padding: 30}}>
                    {credentials}
                    <Button title="Submit" onPress={() => this.join()}/>
                </View>)
        }
        
        else if (this.state.page == "create"){
            return(<View style={{padding: 30}}>
                    {credentials}
                    <FlatList
                        data = {[{key: 'Game1'},{key: 'Game2'}]}
                        renderItem={({item}) => <Text onPress={() => this.create(item.key)}>{item.key}</Text>}
                    />
                </View>)
        }
        
        else if (this.state.page == "Invalid Credentials"){
            return (
                <View style={{padding: 30}}>
                    <Text>Invalid Credentials</Text>
                </View>
            );
        }
        
        else if (this.state.page == "gamePage"){
            return (<View>{game}</View>);
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







