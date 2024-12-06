import { useState } from "react";


const AddCourse=()=>{

    const [course, setCourse]=useState({
        cName:"",
        cDescription:""
    });

    const save=()=>{
       console.log(course);
         
    }
    const textChange=(event:any)=>{
        // setName(event.target.value)
        setCourse({
            ...course,
            [event.target.name]:event.target.value
        })
    }

    return(
        <>
        <input name="cName" type="string" placeholder="coursename" onChange={textChange}></input>
        <input name="cDescription" type="string" placeholder="Description" onChange={textChange}></input>
        <button onClick={save}>Click Me</button>
        </>

    )
}

export default AddCourse