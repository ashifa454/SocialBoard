import React,{Component} from 'react';
import {List,Image,Message,Form,Input,Icon,Segment} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {ActionCreater} from '../app/actions';
class MemberContainer extends Component{
    constructor(props){
        super(props);
        this.state={
            usernam:null,
            isRegistered:false
        }
        this._handleFormSubmit=this._handleFormSubmit.bind(this);
        this._handleInput=this._handleInput.bind(this);
    }
    _handleFormSubmit(e){
        this.props.setMember(this.state.username);
        /*this.setState({
            isRegistered:true
        })*/       
    }
    _handleInput(e,{name,value}){
        this.setState({[name]:value});
    }
    componentDidMount(){

    }
    render(){
        return (
            <div>
        {(this.props.members)?        <Message
            attached
            header={this.props.members}
            content='Chat Here with People on Socio Board'
        />:        <Message
            attached
            header='Active Members'
            content='Add your Name to Get Started'
        />
}
            {(this.props.members&&this.props.members.length>0)?<Form onSubmit={this._handleFormSubmit}>
                <Form.Input label='What`s Your Good Name' name="username" onChange={this._handleInput}/>
                <Form.Button type={'success'}>Get Started</Form.Button>
              </Form>:<div><Segment basic>

              </Segment>
              <Input
              fluid
    icon={<Icon name='search' inverted circular link />}
    placeholder='Search...'
  /></div>
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