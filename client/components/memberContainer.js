import React,{Component} from 'react';
import {List,Image,Message} from 'semantic-ui-react';
class MemberContainer extends Component{
    render(){
        return (
            <div>
    <Message
      attached
      size={'small'}
      header='Active Members'
    />
            <List attached>
            <List.Item>
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