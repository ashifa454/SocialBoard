import React,{Component} from 'react';
import {List,Image,Message,Form} from 'semantic-ui-react';
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
        console.log(this.state.username);
        this.setState({
            isRegistered:true
        })       
    }
    _handleInput(e,{name,value}){
        this.setState({[name]:value});
    }
    componentDidMount(){

    }
    render(){
        return (
            <div>
    <Message
      attached
      header='Active Members'
      content='Add your Name to Get Started'
    />
            {(this.state.username&&this.state.isRegistered)?            <List attached >
            <List.Item style={{backgroundColor:'#FFFFFF'}}>
              <Image size='mini' src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Daniel Louise</List.Header>
              </List.Content>
            </List.Item>
            <List.Item style={{backgroundColor:'#FFFFFF'}}>
              <Image size='mini' src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Daniel Louise</List.Header>
              </List.Content>
            </List.Item>

            <List.Item style={{backgroundColor:'#FFFFFF'}}>
              <Image size='mini' src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Daniel Louise</List.Header>
              </List.Content>
            </List.Item>

            <List.Item style={{backgroundColor:'#FFFFFF'}}>
              <Image size='mini' src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Daniel Louise</List.Header>
              </List.Content>
            </List.Item>

            <List.Item style={{backgroundColor:'#FFFFFF'}}>
              <Image size='mini' src='https://react.semantic-ui.com/assets/images/avatar/small/daniel.jpg' />
              <List.Content>
                <List.Header>Daniel Louise</List.Header>
              </List.Content>
            </List.Item>

          </List>:<Form onSubmit={this._handleFormSubmit}>
                <Form.Input label='What`s Your Good Name' name="username" onChange={this._handleInput}/>
                <Form.Button type={'success'}>Get Started</Form.Button>
              </Form>}
          </div>
        ) 
    }
}   
export default MemberContainer;