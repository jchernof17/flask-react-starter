import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, FormField, Grid, Header, Input, Segment } from 'semantic-ui-react';
import { UserContext } from '../UserContext';

export const Register = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');
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
    }, [email, password, purpose, name]);
    const handleRegister = async () => {
        let body = {email, password, name, purpose}
          setError(false);
          const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (response.status === 200) {
            let res_body = await response.json()
            let returned_user = res_body.access_token;
            setPassword('');
            setEmail('');
            setName('');
            setPurpose('');
            localStorage.setItem('User', returned_user);
            setUser(localStorage.getItem("User"));
        }
         else {
          setError(true);
          setHelperText('Cannot register a user with that email');
          localStorage.setItem('User', false);
          setUser(false);
        }
      };
      const handleKeyPress = (e) => {
        if (e.keyCode === 13 || e.which === 13) {
          isButtonDisabled || handleRegister();
        }
      };
    if (user) {
        return (<Redirect to="/" />);
    }
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
            Create your account
            </Header>
            <Header as='h3' color='red' textAlign='center'>
                {error ? helperText : ''}
            </Header>
            <Segment stacked>
            <Form.Field>
            <Input fluid icon='user' iconPosition='left' placeholder="Your email" value={email} onChange= {e => setEmail(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <Form.Field>
            <Input fluid icon='lock' iconPosition='left' placeholder="Your password" type='password' value={password} onChange= {e => setPassword(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <Form.Field>
            <Input fluid icon='id badge' iconPosition='left' placeholder="Your name" value={name} onChange= {e => setName(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <Form.Field>
            <Input fluid icon='search' iconPosition='left' placeholder="Your purpose" value={purpose} onChange= {e => setPurpose(e.target.value)} onKeyPress={e => handleKeyPress(e)}/>
            </Form.Field>
            <FormField>
                <Button fluid color='teal' size='large' onClick={
                    async () => {
                    handleRegister()
                    }
                    }>Create Account</Button>
            </FormField>
            </Segment>
        </Form>
        </Grid.Column>
        </Grid>       
    )
}