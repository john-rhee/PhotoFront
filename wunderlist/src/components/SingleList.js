import React from 'react';

import {Button} from 'reactstrap';


function SingleList(props) {
    const {id, title, created_at, completed} = props.wList;
    
// function completedBtn (){
//     var finished = document.getElementsByClassName('line');
//     console.log(finished)
//     var finishedArray = Array.from(finished)
//     console.log(finishedArray)
//     finishedArray.map((e)=>{
//         e.addEventListener("click", ()=>{
//             e.style.textDecoration ="line-through";
//             });
//         e.addEventListener("dblclick", ()=>{
//             e.style.textDecoration ="none";
//             });    
//     })
// }

    return (

        <div style={{marginBottom: "2%"}}>

            <h2
            className='line'
            // onClick={completedBtn}
            style={completed === true ? {textDecoration : "line-through"} : {textDecoration : "none"}}
            >{title}</h2>

            <p>Date: {created_at}</p>
            {/* <h3>Completed: {completed}</h3> */}
            <Button style={{backgroundColor: "#73628A"}} onClick={() => props.history.push(`/update/${id}`)}>
                Edit
            </Button>

        </div>    
    )
}

export default SingleList