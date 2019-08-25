import React, {Component} from 'react';
import './Board.scss';
import Card from '../Card';

import {getFront, getImages} from '../../getImages'
class Board extends Component {
    state={
        selectedImg1:0,
        selectedImg2:0,
        listImgs:[],
        listFinded:[
           /* 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,
            -1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17*/
        ],
        front:null,
        click:0
    }
    timer=null;
    
    componentWillUnmount () {
        clearInterval(this.timer)
      }
    componentDidMount=()=>{
        let indexes = this.getIndexes(36);
        let mixIndexes = this.random(indexes);
        let positiveImages = getImages();
        let negativeImages = positiveImages.map(item=>{
            return {
                id: item.id*-1,
                src:item.src
            }
        })
        let images = [...positiveImages, ...negativeImages];        
        let listImages = this.getImagesByIndex(images,mixIndexes);
        this.setState({
            listFinded:[],
            selectedImg1:0,
            selectedImg2:0,
            click:0,
            listImgs:listImages,
            front:getFront()
        });
    }
    getImagesByIndex=(images,indexes)=>{
        let arr = [];
        for(let i=0;i<indexes.length;i++){
            arr.push(images[ indexes[i] ]);
        }

        return arr;
    }
    getIndexes=(count)=>{
        let tempArray = [];
        for (let i=0; i<count; i++) {
            tempArray.push(i);
            // tempArray.push(i);
        }
        return tempArray
    }
    //Размешиваем цифры в массиве
    random=(array)=>{
        let index, valueIndex;
        for (let i=0; i<array.length; i++) {
            index = Math.floor(Math.random()*i);
            valueIndex = array[index];
            array[index] = array[i];
            array[i] = valueIndex;
        }
        return array;
    }
    onClickCard=(id)=>{
        switch(this.state.click){
            case 0:
                this.handlerFirstClick(id);
                break;
            case 1:
                this.handlerSecondClick(id);
                break;
            default:
                this.handlerThirdClick(id);
                break;
        }
        
    }
    handlerFirstClick=(id)=>{
        if(id===this.state.selectedImg1 || id===this.state.selectedImg2)
            return;

        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{

            this.setState({selectedImg1:0, click:0});
            clearTimeout(this.timer);
        },3000);

        this.setState({selectedImg1:id, click:1});
    }
    handlerSecondClick=(id)=>{
        if(id===this.state.selectedImg1 || id===this.state.selectedImg2)
            return;

        clearTimeout(this.timer);
        this.timer = setTimeout(()=>{
            if(Math.abs(this.state.selectedImg1) === Math.abs(this.state.selectedImg2)){
                let listFinded = [...this.state.listFinded, this.state.selectedImg1,this.state.selectedImg2];
                if(listFinded.length===36){
                    this.setState({
                        selectedImg1:0,
                        selectedImg2:0,
                        click:0,
                        listFinded:[]                    
                    });
                    this.props.onFinish();
                }                    
                else
                    this.setState({selectedImg1:0,selectedImg2:0, click:0, listFinded:listFinded});
            
            }else{
                this.setState({selectedImg1:0,selectedImg2:0, click:0});
            }
                
            clearTimeout(this.timer);
        },1000);

        this.setState({selectedImg2:id, click:2});
    }
    handlerThirdClick=(id)=>{
        return;
    }
    getList=()=>{
        return this.state.listImgs.map((item,i)=>{
            let show=false;
            if(item.id===this.state.selectedImg1 || item.id===this.state.selectedImg2)
                show=true;

            let classList = "Board-Card";
            if(this.state.listFinded.includes(item.id)){
                show = true;
                classList = "Board-Card Board-Card--hide";
            }
            

            return (
                <div key={i} className={classList}>
                    <Card show={show} onClickCard={(id)=>{this.onClickCard(id)}} front={this.state.front} src={item.src} id={item.id} />
                </div>
            );
        });
    }
    render(){
        switch(this.props.stateGame){
            case 2:
                return (
                    <div className="Notice">
                        Поздравляем вас с победой!!!             
                    </div>    
                );
            case 1:
                return (
                    <div className="Board">
                        {this.getList()}               
                    </div>        
                );
            case 0:
                    return (
                        <div className="Notice">
                           Нажмите на кнопку Restart            
                        </div> 
                    );
        }
            
        
        
    }  
}

export default Board;
