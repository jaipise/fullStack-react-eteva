import { useState } from 'react'
import firebase from '../firebase'


const Form = () => {
    const [taskName, setTaskName] = useState("")
    const [checklistName, setChecklistName] = useState("")

    const handleOnChange = (e) => {
        setTaskName(e.target.value);
        setChecklistName()
    }

    // CREATE
    const createTask = () => {
        const taskRef = firebase.database().ref("Tasks")
        const task = {
            taskName,
            checklistName,
            complete: false
        }

        taskRef.push(task)
        setTaskName('')
        setChecklistName('')
    }


    return (
        <div className="form-control" >
            <input type="text" onChange={handleOnChange} value={taskName} id="taskAdderInput" />
            <button onClick={createTask} onclick="document.getElementById('taskAdderInput').value = ''" className="btn" >Add a Task</button>
        </div>
    )
}

export default Form