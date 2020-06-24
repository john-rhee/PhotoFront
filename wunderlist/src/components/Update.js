import React, { useContext, useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import WunderContext from '../contexts/WunderContext';

import {Form, Input, Button, FormGroup, Row} from 'reactstrap';


const initialItem = {

    title: "",

    completed: false,

    created_at: "",

};

const Update = props => {

    const {mainForm, setMainForm} = useContext(WunderContext);  
    const [wunder, setWunder] = useState(initialItem);

    console.log(mainForm)
    console.log(props)
    console.log(props.match.params.id)

    const changeHandler = e => {
      e.persist();
      let value = e.target.value;
    //   if (e.target.name === "user_id") {
    //     value = parseInt(value, 10);
    //   }
    setWunder({
        ...wunder,
        [e.target.name]: value
      });
  };

    useEffect(() => {
        // Solves refresh race condition
        console.log(props)
        if (mainForm.length > 0) {
          const newFile = mainForm.find(
            thing => `${thing.id}` === props.match.params.id
          );
          setWunder(newFile);
        }
      }, [mainForm, props.match.params.id]);

    const handleSubmit = e => {
      e.preventDefault();
      axiosWithAuth()
        .put(`https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks/${wunder.id}`, wunder)
        .then(res => {

          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});
            props.history.push(`/lists`);
        })
        .catch(err => console.log(err));
    };

  const deleteList = e => {
      e.preventDefault();
      axiosWithAuth()
      .delete(`https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks/${wunder.id}`)
        .then(res => {

          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});
            props.history.push("/lists");
        })
        .catch(error => console.log(error));
    }

    const postNewWunder = arg => {
      const newWunder = {
        id: Date.now(),
        title: arg.title,
        completed: arg.completed
      };
      axiosWithAuth()
        .post(`https://wunderlist-2-0-be.herokuapp.com/api/todo/users/${wunder.id}/tasks`, newWunder )
        .then(response => {
          
          axiosWithAuth()
          .get('https://wunderlist-2-0-be.herokuapp.com/api/todo/tasks')
          .then(response => {
            setMainForm(response.data.tasks)});
            props.history.push("/lists");

        })
        .catch(error => {
          console.log("the data was not posted", error);
        });
    };

    const addHandleSubmit = e => {
      e.preventDefault();
      postNewWunder(wunder);
      //resetting form
      setWunder({ 
        title: "", 
        completed: false,
        created_at: "" });
      };

// if (mainForm.length === 0) {
//   return <h2>Loading data...</h2>;
// }
console.log(wunder)

return (

    <div style={{margin: "5% 25%"}}>
    <h2 style={{margin: "5% auto"}}>Update or Delete Task</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup row>
            <h3>Your Todo</h3>
            <Input type="text" name="title" onChange={changeHandler} placeholder="title" value={wunder.title} />
        </FormGroup>
        <FormGroup row>

        <h3>Completed: enter true or false</h3>
        {/* <input type="checkbox" name="completed" checked={false} value={wunder.completed}/> */}
        {/* <select value={wunder.completed} onChange={changeHandler}>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select> */}

        <Input type="text" name="completed" onChange={changeHandler} placeholder="completed" value={wunder.completed} />
        {/* <h3>Date:</h3>
        <Input

          type="datetime"
          name="created_at"
          onChange={changeHandler}
          placeholder="created_at"
          value={wunder.created_at}
        /> */}

        </FormGroup>
        <Row>
            <Button style={{backgroundColor: "#73628A", margin: "2%"}}>Update</Button>
            <Button onClick={deleteList} style={{backgroundColor: "#73628A", margin: "2%"}}>
                Delete
            </Button>
        </Row>
      </Form>

    <h2>Add New Task</h2>
    <Form onSubmit={addHandleSubmit}>
        <FormGroup row>
      <Input type="text" name="title" onChange={changeHandler} placeholder="title" value={wunder.title} />
      {/* <Input

      type="boolean"
      name="completed"
      onChange={changeHandler}
      placeholder="enter true or false"
      value={wunder.completed}
      /> */}

      <Button style={{backgroundColor: "#73628A", margin: "2%"}}>Add</Button>
      </FormGroup>
    </Form>

    </div>
  );
};

export default Update;