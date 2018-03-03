import React,{Component} from 'react';
import {List,Image,Message,Form,Input,Loader,Icon,Segment,Feed} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreater} from '../app/actions';
import {dbRefMessage} from '../App/lib/firebaseApi';
class MemberContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            username:null,
            isRegistered:false,
            message:[],
            msgInput:null
        }
        this._handleFormSubmit=this._handleFormSubmit.bind(this);
        this._handleInput=this._handleInput.bind(this);
        this._handleMessaeSubmit=this._handleMessaeSubmit.bind(this);
        /*dbRefMessage.on('value',(snapshot)=>{
            this.setState({
                message:Object.keys(snapshot.val()).map((key)=>{return snapshot[key]})
            },()=>{
                console.log(typeof this.)
            });
        })*/
    }
    _handleFormSubmit(e){
        this.props.setMember(this.state.username);
    }
    _handleInput(e,{name,value}){
        this.setState({[name]:value});
    }
    _handleMessaeSubmit(e){
        if(this.state.msgInput.length>1){
            this.props.sendMessage({
                name:this.state.username,
                message:this.state.msgInput
            })        
        }
    }
    componentDidMount(){
        dbRefMessage.on('value',(snapshot)=>{
            console.log(Object.values(snapshot.val()));
            this.setState({
                message:Object.values(snapshot.val())
            });
        })
    }
    render(){
        return (
            <div>
        {(this.props.members&&this.props.members.length>0)?<Message
            attached
            header={this.props.members}
            content='Chat Here with People on Socio Board'
        />:        <Message
            attached
            header='Active Members'
            content='Add your Name to Get Started'
        />
}
            {(this.props.members&&this.props.members.length>0)?<div>
                  <Segment attached basic style={{backgroundColor:'#FFFFFF',minHeight:'500px',maxHeight:'500px',overflowY:'scroll'}}>
                  
                  <Feed size='small'>
                      {   (this.state.message.length>1)?
                          this.state.message.map((item)=>{
                              return <Feed.Event>
      <Feed.Label icon='smile' />
      <Feed.Content>
        <Feed.Summary>
        <Feed.User>{item.name}</Feed.User>
        </Feed.Summary>
        <Feed.Extra text>
          {item.message}
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>
    
                          }):<Loader active inline='centered'/>
                      }
                </Feed>
              </Segment>
              <Input
              fluid
    icon={<Icon name='send' inverted circular link onClick={this._handleMessaeSubmit}/>}
    placeholder='Type Your Message'
    name='msgInput'
    onChange={this._handleInput}
  /></div>:<Form onSubmit={this._handleFormSubmit}>
                <Form.Input label='What`s Your Good Name' name="username" onChange={this._handleInput}/>
                <Form.Button type={'success'}>Get Started</Form.Button>
              </Form>
                }
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
export default connect(mapStateToProps,mapDispatchToProps)(MemberContainer);