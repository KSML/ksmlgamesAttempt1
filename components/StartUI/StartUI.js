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
            playerName: undefined,
            password: undefined,
            tableName: undefined,
            playing: false,
        };
        this.getRequest = this.getRequest.bind(this)
        
        this.join = this.join.bind(this)
        this.create = this.create.bind(this)
        this.append = this.append.bind(this)
        this.clear = this.clear.bind(this)
        this.quit = this.quit.bind(this)
        
    }
    
    
    create(input){
        ID = this.state.password+this.state.tableName  // HASH THIS !!!
//        getRequest("func=new&tableID="+ID,) // finish this
        
        // getRequest("func=new&tableID="+ID,true)
        // while (this.state.webPending); // wait for table to be made
        // PUT MORE STUFF HERE
        // if the credentials are bad, do this:
        // game = <Text>Table in use</Text>
        // add a button so you can go back to the start page
        // also when a game is successfully made write its name in the first 10 bytes
        // otherwise do this:
        
        
        
        
        
        if (input == "Game1"){
            this.setState({gameFile:"Game1     ", playing:true})
            game = <Game1
                master = {this.state.master}
                playerName = {this.state.playerName}
                tableName = {this.state.tableName}
                read = {() => {return this.state.gameFile}}
                append = {this.append}
                quit = {this.quit}
                clear = {this.clear}
            />
        }
        else if (input == "Game2"){
            this.setState({gameFile:"Game2     ", playing:true})
            game = <Game2
                master = {this.state.master}
                playerName = {this.state.playerName}
                tableName = {this.state.tableName}
                read = {() => {return this.state.gameFile}}
                append = {this.append}
                quit = {this.quit}
                clear = {this.clear}
            />
        }
        else game = <Text>ERROR</Text>
        
        this.setState({page:"gamePage", Game:game})
    }
    
    
    join(){
        // FINISH THIS
        // check for valid credentials and try to join the game, read the game name from the gameFile
        game = <View style={{padding: 30}}><Text>unknown game (fix this)</Text></View>
        
        this.setState({page:"gamePage", Game:game})
    }
    
    
    append(input){
        // later make this a getRequest
        this.setState({gameFile:this.state.gameFile+input})
    }
    

    clear(){
        // replace this with a get request
        this.setState({gameFile:this.state.gameFile.substring(0,10)})
    }
    
    
    quit(){
        // replace this with a get request
        
        if (this.state.master); // do get request to delete the file, also add a thing that deals with the case
        // where the file is deleted (by the master) and a non master player hasen't quit yet
        
        this.setState({page:"start",
                       gameFile:undefined,
                       playing:false,
                       playerName:undefined,
                       tableName:undefined,
                       password:undefined})
    }
    
    
    componentDidMount(){
        // replace this chunk with code that keeps gameFile updated correctly using getRequests
        // gameFile is only updated while playing
        setInterval(() => {
            if (this.state.playing) this.setState(prevState => ({gameFile: prevState.gameFile+'a'}))
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







