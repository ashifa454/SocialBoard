import React,{Component} from 'react';
import {Button,Segment,Message,Header,Label,TransitionablePortal} from 'semantic-ui-react';
import openSocket from 'socket.io-client';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreater} from '../App/actions/index.js';
const serverScoket=openSocket('https://socialboard.herokuapp.com/');
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
            OthUser:null,
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
        this.state.currentLine.push(
            {x:x,y:y}
        );
        this.state.clkDrag.push(drag)
        this.state.clkColor.push(this.state.brushColor)
    }
    componentDidMount(){
        this.setState({
            myCanvas:this.refs.board.getContext("2d")},()=>{
                this.state.myCanvas.lineJoin="round";
                this.state.myCanvas.lineWidth=5;
                this.state.myCanvas.font="14pt Arial";
                this.state.myCanvas.textAlign = "end";
                this.state.myCanvas.fillStyle = "#9E9E9E";
                this.state.myCanvas.clearRect(0, 0,this.state.myCanvas.width, this.state.myCanvas.height); 
                //this.state.myCanvas.strokeText("Stroke Text, 22px, veranda", 20, 50);                                
                
            });
            serverScoket.on('draw_lines',(data)=>{
                this.state.myCanvas.beginPath(); 
                this.state.myCanvas.strokeStyle=data.color;
                this.state.myCanvas.moveTo(data.previousLine[0],data.previousLine[1]);
                this.state.myCanvas.lineTo(data.line[0], data.line[1]);
                this.state.myCanvas.closePath();                                                            
                this.state.myCanvas.stroke();
            });
            serverScoket.on('increase_line',(data)=>{
                this.state.myCanvas.fillText(data.username, data.x,data.y);
            })
    }
    _handleColorSelect(index){
        this.setState({
            brushColor:colors[index]
        })
    }
    _handleMouseDown(event){
        if(this.props.members&&this.props.members.length>0){
            this.setState({
                paint:true
            })
            var drawX=event.pageX-this.refs.board.getBoundingClientRect().left;
            var drawY=event.pageY-this.refs.board.getBoundingClientRect().top;
            this.addClickEvent(drawX,drawY,false);
            this.redrawBoard();
        }else{
            alert("You Need To Enter your Name to Get Started");
        }
    }
    _handleMouseMove(event){
        var drawX=event.pageX-this.refs.board.getBoundingClientRect().left;
        var drawY=event.pageY-this.refs.board.getBoundingClientRect().top;
        if(this.state.paint){
            this.addClickEvent(drawX,drawY,true);
            this.redrawBoard();
        }
    }
    _handleMouseUp(event){
        var drawX=event.pageX-this.refs.board.getBoundingClientRect().left;
        var drawY=event.pageY-this.refs.board.getBoundingClientRect().top;
        if(this.props.members&&this.props.members.length>0){
        this.setState({
            paint:false,
        },()=>{
            serverScoket.emit('increase_line',{
                x:drawX,
                y:drawY,
                username:this.props.members        
            })
        })
        this.redrawBoard();
        }
    }
    _handleMouseLeave(event){
        this.setState({
            paint:false,
        },()=>{
            serverScoket.emit('increase_line',{
                
            })
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
                    color:this.state.clkColor[index],
                    username:this.props.members
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
                    color:this.state.clkColor[index],
                    username:this.props.members
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
                    style={{border:'1px dashed #212121',backgroundColor:'#FFFFFF',cursor:'pointer'}}>
            
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
function mapStateToProps(state){
    return {
        members:state.NewMember
    }
}
function mapDispatchToProps(dispatch){
    return bindActionCreators(ActionCreater,dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(SocialBoard);