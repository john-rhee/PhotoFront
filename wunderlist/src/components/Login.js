import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import axios from "axios";
import WunderContext from '../contexts/WunderContext';

import { Col, Button, Form, FormGroup, Input } from 'reactstrap';


const Login = props =>{

  const {mainForm, setMainForm} = useContext(WunderContext);  

  const [state, setState] = useState({
    credentials: {
      email: '',
      password: ''
    },
    isLoggedIn: false
  });  

  const handleChange = e => {
      setState({
        credentials: {
          ...state.credentials,
          [e.target.name]: e.target.value
        }
      });
    };

  const loginEvent = event => {
      event.preventDefault();
      axios.post('https://wunderlist-2-0-be.herokuapp.com/api/auth/login', state.credentials)
      .then(response => {
          console.log(response);
          const { data } = response;

          localStorage.setItem("token", data.token);
          setState({ ...state, isLoggedIn: true });

          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});

          props.history.push('/lists');
      })
  }

  // if (sessionStorage.getItem("token")) {
  //   setState({ ...state, isLoggedIn: true });
  // } else {
  //   setState({ ...state, isLoggedIn: false });
  // }

  return (
    <div>

      <Form onSubmit={loginEvent} style={{margin: "5% 25%"}}>
        <h2>{state.isLoggedIn ? "Logged In" : "Please login"}</h2>
        <FormGroup row>
            <Col sm={8}>
                <Input type="text" name="email" id="email" placeholder="Email Address" value={state.credentials.email} onChange={handleChange} />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Col sm={8}>
                <Input type="password" name="password" id="password" placeholder="Password" value={state.credentials.password} onChange={handleChange} />
            </Col>
        </FormGroup>
        <FormGroup row>
            <Col>
                <Button type="submit" style={{backgroundColor: "#73628A"}}>Log In</Button>
            </Col>
        </FormGroup>
        </Form>

    </div>
  );

}  

export default Login;