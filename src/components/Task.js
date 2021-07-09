import firebase from '../firebase'


const Task = ({ task }) => {
    // DELETE
    const deleteTask = () => {
        const taskRef = firebase.database().ref("Tasks").child(task.id)
        taskRef.remove()
    }

    // UPDATE
    const completeTask = () => {
        const taskRef = firebase.database().ref("Tasks").child(task.id)

        taskRef.update({
            complete: !task.complete,
        })
    }
    return (
        <div>
            <h2 className={task.complete ? "complete task" : ""}>{task.taskName}</h2>
            {/* <button onClick={deleteTask} className="btn delete" >Delete</button> */}
            <button onClick={completeTask} className="btn">Complete</button>
        </div>
    )
}

export default Task
