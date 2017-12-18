import React from 'react';
import Utils from '../utils/utils.js'
import {
    Grid,
    Col,
    Button,
    Form,
    FormGroup,
    ControlLabel,
    FormControl  
} from 'react-bootstrap';

export class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: ''
        }
        this.utils = new Utils();
    }

    signIn() {
        this.utils.sendData('/api/token', {user:this.state.userName, pw: this.state.passWord})
        .then(data=> {
            localStorage.setItem("token", data);
            window.location ='/';
        });
    }

    handleKeyPress(event) {
        if(event.key === 'Enter' || event.key === 'Return') {
            this.signIn();
        }
    }

    render() {
        return (
            <Grid>
                <Col md={4}>
                    <Form className="loginForm">
                        <FormGroup controlId="formUserName">
                            <ControlLabel>Username</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.userName}                                
                                onChange={e => this.setState({ userName: e.target.value })}
                                onKeyPress={e=> this.handleKeyPress(e)}
                            />                            
                        </FormGroup>
                        <FormGroup controlId="formPassword">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                type="password"
                                value={this.state.passWord}
                                onChange={e => this.setState({ passWord: e.target.value })}
                                onKeyPress={e=> this.handleKeyPress(e)}
                            />                            
                              
                        </FormGroup>
                        <Button bsStyle="success" block onClick={e=> this.signIn()}>SignIn</Button>
                    </Form>                   
                </Col>
            </Grid>
        );
    }
}


export default UserLogin;