import React,{Component} from 'react';
import {List,Image,Message} from 'semantic-ui-react';
class MemberContainer extends Component{
    render(){
        return (
            <div>
    <Message
      attached
      header='Active Members'
      content='All Active Members'
    />
            <List attached >
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

          </List>
          </div>
        ) 
    }
}   
export default MemberContainer;