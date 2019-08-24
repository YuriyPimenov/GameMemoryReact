import React, {Component} from 'react';
import './Header.scss';

class Header extends Component {
    onRestart=()=>{
        this.props.onRestart();
    }
    onRename=()=>{
        var name = prompt('Ваше Ник?', 'Player');
        this.props.onRename(name);
    }

    render(){
        const {result,selectedPlayer} = this.props;
        return (
            <div className="Header">
                <div className="Header-player">
                    {selectedPlayer}
                </div>
                <div className="Header-timer">
                    Time: {result}
                </div>
                <div className="Header-buttons">
                    <div className="Header-buttons__rename Header-button"  onClick={()=>{this.onRename()}}>Rename</div>
                    <div className="Header-buttons__restart Header-button" onClick={()=>{this.onRestart()}}>Restart</div>
                </div>
            </div>

        );
    }  
}

export default Header;
