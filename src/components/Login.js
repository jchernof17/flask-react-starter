import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormField, Grid, Header, Input, Segment } from 'semantic-ui-react';
import { UserContext } from '../UserContext';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [helperText, setHelperText] = useState('');
    const [error, setError] = useState(false);
    const {user, setUser} = useContext(UserContext);

    useEffect(() => {
        if (email.trim() && password.trim()) {
            setIsButtonDisabled(false);
          } else {
            setIsButtonDisabled(true);
          }
    }, [email, password]);

    const handleLogin = async () => {
        let body = {email, password};
          const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        console.log(response);
        if (response.status === 200) {
            let res_body = await response.json();
            let returned_user = res_body.user;
            setPassword('');
            setEmail('');
            setHelperText('');
            setError(false);
            localStorage.setItem('User', JSON.stringify(returned_user));
            setUser(JSON.parse(localStorage.getItem("User")));
        } else {
          setError(true);
          setHelperText('Incorrect email or password');
          setUser(false);
          localStorage.setItem('User', false);
        }
      };
      const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
          isButtonDisabled || handleLogin();
        }
      };

    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h1' style={{ fontSize: '5em', padding:'1em 0em' }} textAlign='center'>
                {user ? <Redirect to="/" /> : ''}
            app name
            </Header>
        <Form size="large">
            <Header as='h2' color='teal' textAlign='center'>
                {user ? <Redirect to="/" /> : ''}
            Log In to your account
            </Header>
            <Header as='h3' color='red' textAlign='center'>
                {error ? helperText : ''}
            </Header>
            <Segment stacked>
            <Form.Field>
            <Input fluid icon='user' iconPosition='left' placeholder="Your email" value={email} onChange= {e => setEmail(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <Form.Field>
            <Input fluid icon='lock' iconPosition='left' placeholder="Your password" type='password' autocomplete="current-password" value={password} onChange= {e => setPassword(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <FormField>
                <Button fluid color='teal' size='large' onClick={
                    async () => {
                    handleLogin()
                    }
                    }>Log In</Button>
            </FormField>
            </Segment>
        </Form>
        </Grid.Column>
        </Grid>       
    )
}