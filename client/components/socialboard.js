import React,{Component} from 'react';
import {Button,Segment,Message,Header,Label,TransitionablePortal} from 'semantic-ui-react';
import openSocket from 'socket.io-client';
const serverScoket=openSocket('http://localhost:3000');
const colors=[
    'red', 'orange', 'yellow', 'olive', 'green', 'teal',
    'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]
class SocialBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            currentLine:[],
            previousLine:[],
            clkDrag:[],
            paint:false,
            clkColor:[],
            brushColor:'#212121',
            myCanvas:null
        }
        this._handleMouseDown=this._handleMouseDown.bind(this);
        this._handleMouseUp=this._handleMouseUp.bind(this);
        this._handleMouseMove=this._handleMouseMove.bind(this);
        this._handleMouseLeave=this._handleMouseLeave.bind(this);
        this._handleColorSelect=this._handleColorSelect.bind(this);
    }
    addClickEvent(x,y,drag){
        this.state.currentLine.push({
            x:x,y:y});
        //this.state.clkY.push(y);
        this.state.clkDrag.push(drag)
        this.state.clkColor.push(this.state.brushColor)
    }
    componentDidMount(){
        this.setState({
            myCanvas:this.refs.board.getContext("2d")},()=>{
                this.state.myCanvas.lineJoin="round";
                this.state.myCanvas.lineWidth=5;
            });
            serverScoket.on('draw_lines',(data)=>{
                this.state.myCanvas.beginPath(); 
                this.state.myCanvas.moveTo(data.previousLine[0],data.previousLine[1]);
                this.state.myCanvas.lineTo(data.line[0], data.line[1]);
                this.state.myCanvas.closePath();
                this.state.myCanvas.strokeStyle=data.color;            
                this.state.myCanvas.stroke();
        });
    }
    _handleColorSelect(index){
        this.setState({
            brushColor:colors[index]
        })
    }
    _handleMouseDown(event){
        this.setState({
            paint:true
        })
        var drawX=event.pageX-this.refs.board.offsetLeft;
        var drawY=event.pageY-this.refs.board.offsetTop;
        this.addClickEvent(drawX,drawY);
        this.redrawBoard();
    }
    _handleMouseMove(event){
        if(this.state.paint){
            var drawX=event.pageX-this.refs.board.offsetLeft;
            var drawY=event.pageY-this.refs.board.offsetTop;
            this.addClickEvent(drawX,drawY,true);
            this.redrawBoard();
            this.state.previousLine.push({
                x:drawX,
                y:drawY
            })
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
        this.state.currentLine.map((item,index)=>{
            this.state.myCanvas.beginPath();
            this.state.myCanvas.strokeStyle=this.state.clkColor[index];                        
            if(this.state.clkDrag[index]&&index){
                this.state.myCanvas.moveTo(this.state.currentLine[index-1].x,this.state.currentLine[index-1].y);
                serverScoket.emit('draw_lines',{
                    line:[
                        this.state.currentLine[index].x,this.state.currentLine[index].y
                    ],
                    previousLine:[
                        this.state.currentLine[index-1].x,this.state.currentLine[index-1].y
                    ],
                    color:this.state.brushColor,
                })
            }else{
                this.state.myCanvas.moveTo(this.state.currentLine[index].x-1,this.state.currentLine[index].y);
                serverScoket.emit('draw_lines',{
                    line:[
                        this.state.currentLine[index].x,this.state.currentLine[index].y
                    ],
                    previousLine:[
                        this.state.currentLine[index].x-1,this.state.currentLine[index].y
                    ],
                    color:this.state.brushColor,
                })
            }
            
            this.state.myCanvas.lineTo(this.state.currentLine[index].x,this.state.currentLine[index].y);
            this.state.myCanvas.closePath();
            this.state.myCanvas.stroke();
        });
    }
    render(){
        return(
            <div>
                <Message
      attached
      color={this.state.brushColor}
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
        {
            colors.map((item,index)=>{
                {
                    return <Label style={{cursor:'pointer'}} circular onClick={(e)=>this._handleColorSelect(index)} color={item} key={index}></Label>
                }
            })
        }

  </Segment>
            </div>
        )
    }
}
export default SocialBoard;