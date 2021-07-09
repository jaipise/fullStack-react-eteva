import firebase from '../firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const ChecklistThumbnail = ({ checklist }) => {
    const [checklistName, setChecklistName] = useState('')
    const [checklistList, setChecklistList] = useState()

    // useEffect(() => {
    //     const checklistRef = firebase.database().ref("Checklists")

    //     checklistRef.on("value", (snapshot) => {
    //         const checklists = snapshot.val()
    //         const checklistListTemp = []
    //         for (let id in checklists) {
    //             checklistListTemp.push({ id, ...checklists[id] })
    //         }
    //         setChecklistList(checklistListTemp)
    //     })
    // }, [])

    const createChecklist = () => {
        const checklistRef = firebase.database().ref("Checklists")
        const checklist = {
            checklistName,
        }

        checklistRef.push(checklist)
        setChecklistName('')
    }

    return (
        <div>
            {/* <button onClick={createChecklist}>Click</button> */}
            <Link to={`/${checklist.checklistName}`}>
                <h2> - {checklist.checklistName}</h2>
            </Link>

        </div>
    )
}

export default ChecklistThumbnail
