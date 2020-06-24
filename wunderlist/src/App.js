import React, { useContext, useState, useEffect } from 'react';
import './App.css';
import { axiosWithAuth } from './utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Update from './components/Update';
import Search from './components/Search';
import AllLists from './components/AllLists';
import WunderContext from './contexts/WunderContext';
import PrivateRoute from "./components/PrivateRoute";

import {Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';


function App() {
  // These two lines are to toggle the Menu options
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);


  const [mainForm, setMainForm] = useState([]);

    useEffect( () => {
      axiosWithAuth().get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
              // setWunderlist(response.data.tasks);
              setMainForm(response.data.tasks);
              console.log('app axios get', response.data);
          })
          .catch(error => {
              console.log(error)
          })
          if(!localStorage.getItem('token')) {
              console.error('Not logged in');
          }   else {
              console.info('Logged in.');
          }
  }, []);

  return (
  <WunderContext.Provider value={{mainForm, setMainForm}}>	   
    <Router>
      <div className="App">

        <Navbar style={{background: "#EAEAEA", color: "#CBC5EA"}} light expand="md">
          <NavbarBrand href="/lists">Wunderlist 2.0</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavLink>
                <Link to='/login' onClick ={() => localStorage.clear()} style={!localStorage.getItem ('token') ? {display: 'none'} : {color: "#313D5A"}}>
                  Log out
                </Link>
              </NavLink>
              <NavItem>
                <NavLink>
                  <Link to='/register' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                    Register
                  </Link>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink>
                  <Link to='/login' style={!localStorage.getItem('token') ? {color: "#313D5A"} : { display: 'none' }}>
                    Login
                  </Link>
                </NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>

        </div>
        {/* <Switch> */}
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/search' component={Search} />
          <PrivateRoute exact path="/lists" component={AllLists}/>
          <Route
            path="/update/:id"
            render={props => {
            return <Update {...props}/>
            }}  
            /> 
        {/* </Switch> */}
    </Router>
  </WunderContext.Provider>    
  );
}


export default App;

