import Task from './Task'

import { useEffect, useState } from 'react';
import firebase from '../firebase'

// import 'bootstrap/dist/css/bootstrap.min.css'

const Checklist = ({ checklistName }) => {
    const [taskList, setTaskList] = useState()
    const [submittedList, setSubmittedList] = useState()

    // READ from database
    useEffect(() => {
        const taskRef = firebase.database().ref("Tasks")

        taskRef.on("value", (snapshot) => {
            const tasks = snapshot.val()
            const taskListTemp = []
            for (let id in tasks) {
                if (tasks[id].checklistName === checklistName) {
                    taskListTemp.push({ id, ...tasks[id] })
                }
            }
            setTaskList(taskListTemp)
        })
    }, [])

    const submitChecklist = () => {
        const submitRef = firebase.database().ref("Submitted")

        const submission = {
            checklistName,
            taskList,
        }

        submitRef.push(submission)

        // update all completed tasks to incomplete
        for (let i = 0; i < taskList.length; i++) {
            let task = taskList[i]
            const taskRef = firebase.database().ref("Tasks").child(task.id)

            taskRef.update({
                complete: false,
            })
        }
        // console.log(taskList[0])
    }


    return (
        <div className="container">
            <h1>Tasks:</h1>
            <div>{taskList ? taskList.map((task, index) => <Task task={task} key={index} />) : ''}</div>
            <button onClick={submitChecklist} className="btn submit">Submit</button>
        </div>
    )
}

export default Checklist