import React, { Component } from 'react';
import { Grid,Button } from 'semantic-ui-react'
import MemberContainer from './memberContainer';
import SocialBoard from './socialboard';
class App extends Component {


    constructor(props){
        super(props);
        
    }
    render() {
        return (
        <div style={{padding:20}}>   
            <Grid>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <SocialBoard/>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <MemberContainer/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
        );
    }
}

export default App