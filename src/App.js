import React,{Component} from 'react';
import Header from './components/Header'
import Body from './components/Body'

import './App.scss';

class App extends Component {
  state={
    result:0,
    players:{},
    selectedPlayer:'Player',
    stateGame:0
  }
  timer=null

  componentDidMount=()=>{
    var players = JSON.parse(localStorage.getItem("players"));
    if(players===null || players===undefined) players={};
    console.log(11,players);
    this.setState({players: players});
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }
  tick () {
    this.setState({result: (this.state.result + 1)})
  }
  onFinish=()=>{
    console.log('Finish!!');

    var players = {...this.state.players, [this.state.selectedPlayer]:this.state.result};
    var playersStr = JSON.stringify(players); 
    localStorage.setItem("players", playersStr);
    this.setState({players: players, stateGame:2});
    clearInterval(this.timer);
  }
  onStop () {
    clearInterval(this.timer)
  }
  onRestart=()=>{
    
    this.setState({result: 0, stateGame:1});
    clearInterval(this.timer);
    this.timer = setInterval(this.tick.bind(this), 1000);
  }
  onRename=(name)=>{    
    this.setState({selectedPlayer: name});
  }
 
  render(){
    return (
      <div className="App">
          <Header 
          selectedPlayer={this.state.selectedPlayer} 
          result={this.state.result} 
          onRestart={()=>{this.onRestart()}} 
          onRename={(name)=>{this.onRename(name)}}
          />
          <Body stateGame={this.state.stateGame} onFinish={()=>{this.onFinish()}} players={this.state.players} />
      </div>
    );
  }
  
}

export default App;
