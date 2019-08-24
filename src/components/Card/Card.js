import React, {Component} from 'react';
import './Card.scss';

class Card extends Component {
    render(){
        const {id,front,src, show=false, onClickCard} = this.props;

        let classList = show ? "flip-container hover" : "flip-container";

        return (
            
            <div className={classList} onClick={()=>{onClickCard(id)}} >
                <div className="flipper">
                <div className="front">
                    <img src={front} width="80px" height="80px"/>
                </div>
                <div className="back">
                    <img src={src} width="80px" height="80px"/>
                </div>
                </div>
            </div>
            

        );
    }  
}

export default Card;
