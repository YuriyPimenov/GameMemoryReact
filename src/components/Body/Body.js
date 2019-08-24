import React, {Component} from 'react';
import './Body.scss';
import Board from '../Board'
class Body extends Component {
    
    getList=()=>{
        var {players} = this.props;
        var sortable = [];
        for (var key in players) {
            sortable.push([key, players[key]]);
        }

        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        return sortable;
        //[["bike", 60], ["motorbike", 200], ["car", 300],
        //["helicopter", 400], ["airplane", 1000], ["rocket", 28800]]

    }

    render(){
        const players = this.getList();
        return (
            <div className="Body">
                <div className="Body-board">
                    <Board stateGame={this.props.stateGame} onFinish={()=>{this.props.onFinish()}} />
                </div>
                <div className="Body-sidebar">
                    <div className="Body-sidebar-title">Рейтинг игроков</div>
                    <div className="Body-sidebar-list">
                        {
                            players.map((item,k)=>{
                                return (
                                    <div key={k} className="Body-sidebar-item">
                                        <div className="Body-sidebar-item__name">{item[0]}</div>
                                        <div className="Body-sidebar-item__result">{item[1]}</div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                
            </div>

        );
    }  
}

export default Body;
