import React, {useState} from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { Col, Button, Row, Form, FormGroup, Input } from 'reactstrap';


function Register(props) {
    const [user, setUser] = useState({first_name: '', last_name: '', email: '', password: ''});

    const handleChanges = e => {


        setUser({ ...user, [e.target.name]: e.target.value });
      };

    const submitForm = e => {
        e.preventDefault();

        ///added for form validation demo
        let message = ""
        if (user.password.length <= 6){
            message='Password must be longer than 6 characters'
        }

        if (message) {
            setUser({ ...user, message });
            return 
        }

        axiosWithAuth().post('https://wunderlist-2-0-be.herokuapp.com/api/auth/register', user)
            .then(response => {
                props.history.push('/login')
            })
            .catch(error => {
                console.log(error)
                setUser({first_name: '', last_name: '', email: '', password: ''})
            })

    };

    return (
        <div>
            <Form onSubmit={submitForm} style={{margin: "5% 25%"}}>
            <h2>Register</h2>
            <Row form>
                <Col md={3}>
                <FormGroup>
                    <Input type="text" name="first_name" id="first_name" placeholder="First Name"  value={user.first_name} onChange={handleChanges} />
                </FormGroup>
                </Col>
                <Col md={3}>
                <FormGroup>
                    <Input type="text" name="last_name" id="last_name" placeholder="Last Name" value={user.last_name} onChange={handleChanges} />
                </FormGroup>
                </Col>
            </Row>
            <FormGroup row>
                <Col sm={8}>
                <Input type="email" name="email" id="email" placeholder="Email Address" value={user.email} onChange={handleChanges} />
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col sm={8}>
                <Input type="password" name="password" id="password" placeholder="Password" value={user.password} onChange={handleChanges} />
                {/* added for form validation demo */}
                <div>{user.message}</div>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Col>
                <Button type="submit" style={{backgroundColor: "#73628A"}}>Submit</Button>
                </Col>
            </FormGroup>
            </Form>
        </div>
    )
}

export default Register