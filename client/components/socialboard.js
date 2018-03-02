import React,{Component} from 'react';
import {Button,Segment,Message,Header,Label} from 'semantic-ui-react'
class SocialBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            clkX:[],
            clkY:[],
            clkDrag:[],
            paint:false,
            myCanvas:null
        }
        this._handleMouseDown=this._handleMouseDown.bind(this);
        this._handleMouseUp=this._handleMouseUp.bind(this);
        this._handleMouseMove=this._handleMouseMove.bind(this);
        this._handleMouseLeave=this._handleMouseLeave.bind(this);
    }
    addClickEvent(x,y,drag){
        this.state.clkX.push(x);
        this.state.clkY.push(y);
        this.state.clkDrag.push(drag)
    }
    componentDidMount(){
        this.setState({
            myCanvas:this.refs.board.getContext("2d")});
    }
    _handleMouseDown(event){
        this.setState({
            paint:true
        })
        this.addClickEvent(event.pageX-this.refs.board.offsetLeft,event.pageY-this.refs.board.offsetTop);
        this.redrawBoard();
    }
    _handleMouseMove(event){
        if(this.state.paint){
            this.addClickEvent(event.pageX-this.refs.board.offsetLeft,event.pageY-this.refs.board.offsetTop,true);
            this.redrawBoard();
        }
    }
    _handleMouseUp(event){
        this.setState({
            paint:false
        })
    }
    _handleMouseLeave(event){
        this.setState({
            paint:false
        })
    }
    redrawBoard(){
        this.state.myCanvas.clearRect(0,0,this.state.myCanvas.canvas.width,this.state.myCanvas.canvas.height);
        this.state.myCanvas.strokeStyle='#212121';
        this.state.myCanvas.lineJoin="round";
        this.state.myCanvas.lineWidth=5;
        this.state.clkX.map((item,index)=>{
            this.state.myCanvas.beginPath();
            if(this.state.clkDrag[index]&&index){
                this.state.myCanvas.moveTo(this.state.clkX[index-1],this.state.clkY[index-1]);
            }else{
                this.state.myCanvas.moveTo(this.state.clkX[index]-1,this.state.clkY[index]);
            }
            this.state.myCanvas.lineTo(this.state.clkX[index],this.state.clkY[index]);
            this.state.myCanvas.closePath();
            this.state.myCanvas.stroke();
        });
    }
    render(){
        return(
            <div>
                <Message
      attached
      header='Welcome to Social Board!'
      content='Start Drawing whatever you want'
    >
    
            </Message>
    <Segment basic attached>
            <canvas ref="board" 
                    onMouseDown={this._handleMouseDown} 
                    onMouseMove={this._handleMouseMove} 
                    onMouseLeave={this._handleMouseLeave}
                    onMouseUp={this._handleMouseUp}
                    height={500} width={910} 
                    style={{border:'1px dashed #212121',backgroundColor:'#FFFFFF'}}>
            
            </canvas>        
    </Segment>
    <Segment clearing attached size={'mini'}>
        <Label circular color={'red'}>2</Label>
  </Segment>
            </div>
        )
    }
}
export default SocialBoard;