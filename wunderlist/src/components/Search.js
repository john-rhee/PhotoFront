import React, { useContext, useState, useEffect } from 'react';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import SingleList from './SingleList';
import WunderContext from '../contexts/WunderContext';

import {Form, Input} from 'reactstrap';


function Search() {

    const {mainForm, setMainForm} = useContext(WunderContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const searchHandleChange = event => {
    event.preventDefault();
    setSearchTerm(event.target.value);
    };

    useEffect(() => {
    const results = mainForm.filter(dataObject =>
        dataObject.title.toLowerCase().includes(searchTerm.toLowerCase())
        );  
    setSearchResults(results)
    }, [searchTerm]);
        
    return (

        <div style={{margin: "5% 25%"}}>
            <h2>Search Task</h2>
            <Form style={{marginBottom: "3%"}}>
            <Input

                type="text"
                name="search"
                placeholder="Search Task"
                value={searchTerm}
                onChange={searchHandleChange}
            />

            </Form>
            <div style={{border: "solid 2px black", margin: "5% auto", padding: "4%", borderRadius: "5%"}}>
            {searchResults.map((data) => (
                <div key={data.id}>
                {/* {data.title} */}
                <Route render={props => {return <SingleList {...props} wList={data} />}} />
                </div>
            ))}
            </div> 

        </div>
    )
}

export default Search