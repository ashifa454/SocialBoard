import React,{Component} from 'react';
import {Button,Segment,Message,Header,Label} from 'semantic-ui-react';
const colors=[
    'red', 'orange', 'yellow', 'olive', 'green', 'teal',
    'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'
]
class SocialBoard extends Component{
    constructor(props){
        super(props);
        this.state={
            clkX:[],
            clkY:[],
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
        this.state.clkX.push(x);
        this.state.clkY.push(y);
        this.state.clkDrag.push(drag)
        this.state.clkColor.push(this.state.brushColor)
    }
    componentDidMount(){
        this.setState({
            myCanvas:this.refs.board.getContext("2d")});
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
            this.state.myCanvas.strokeStyle=this.state.clkColor[index];            
            this.state.myCanvas.stroke();
        });
    }
    render(){
        const {brushColor}=this.state;
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