import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SingleList from './SingleList';
import WunderContext from '../contexts/WunderContext';

import {Button} from 'reactstrap';


const initialItem = {

    title: "",

    completed: false,
};

function AllLists() {

    const {mainForm, setMainForm} = useContext(WunderContext);

    // const [wunderlist, setWunderlist] = useState([]);  

    // useEffect( () => {
    //     axiosWithAuth().get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
    //         .then(response => {
    //             // setWunderlist(response.data.tasks);
    //             setMainForm(response.data.tasks);
    //             console.log(response.data.tasks);
    //             console.log(mainForm);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    //         if(!localStorage.getItem('token')) {
    //             console.error('Not logged in');
    //         }   else {
    //             console.info('Logged in.');
    //         }
    // }, []);

    // const [searchTerm, setSearchTerm] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    // const searchHandleChange = event => {
    // event.preventDefault();
    // setSearchTerm(event.target.value);
    // };

    // useEffect(() => {
    // const results = mainForm.filter(dataObject =>
    //     dataObject.title.toLowerCase().includes(searchTerm.toLowerCase())
    //     );  
    // setSearchResults(results)
    // }, [searchTerm]);
        
    return (

        <div style={{margin: "5% 25%"}}>
            <div style={{display: "flex"}}>
            <h2 style={{margin: "0 4%"}}>Welcome to Your Wunderlist</h2>
            {/* <h3>

                {/* To crossout a task: click once
                <br/>
                To undo crossout: click twice
                <br/> */}

                {/* To update, delete, or add: press edit.
                <br/>
                To search, press the search link below.
            </h3> */}

            <Link to="/search">
            <Button style={{backgroundColor: "#73628A"}}>Search Tasks</Button>
            </Link>
            </div>

            {/* <form>
            <input
                type="text"
                name="search"
                placeholder="Search Task"
                value={searchTerm}
                onChange={searchHandleChange}
            />
            </form>
            {searchResults.map((data) => (
            <div key={data.id}> */}
                {/* {data.title} */}
                {/* <Route render={props => {return <SingleList {...props} wList={data} />}} />
                </div> 
            ))} */}

            <div style={{border: "solid 2px black", margin: "5% auto", padding: "4%", borderRadius: "5%"}}>

            {mainForm.map(todo => (
                <div 
                key={todo.id}
                >
                    {/* <WunderDetails  todo={todo} /> */}
                    <Route render={props => {return <SingleList {...props} wList={todo} />}} />
                </div>
            ))}

            </div>

        </div>
    )
}

// function WunderDetails({ todo }) {
//     return (
//       <Link to={`/todo/tasks/${todo.id}`}>
//         <SingleList todo={todo} />
//       </Link>
//     );
// }

export default AllLists