import React, { useState, useEffect } from 'react'
import firebase from '../firebase'
import ChecklistThumbnail from './ChecklistThumbnail'
import Checklist from './Checklist'
import { Link } from 'react-router-dom'


const ChecklistList = () => {
    const [checklistList, setChecklistList] = useState()

    useEffect(() => {
        const checklistRef = firebase.database().ref("Checklists")

        checklistRef.on("value", (snapshot) => {
            const checklists = snapshot.val()
            const checklistListTemp = []
            for (let id in checklists) {
                checklistListTemp.push({ id, ...checklists[id] })
            }
            setChecklistList(checklistListTemp)
        })
    }, [])
    return (
        <div>
            <p className="header">Choose which checklist you would like to open: </p>
            {checklistList ? checklistList.map((checklist, index) =>
                <ChecklistThumbnail checklist={checklist} key={index} />
            ) : ''
            }
        </div>
    )
}

export default ChecklistList
