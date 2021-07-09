import './App.css';
import './style.css';
import Form from './components/Form'
import Checklist from './components/Checklist'
import ChecklistThumbnail from './components/ChecklistThumbnail'
import ChecklistList from './components/ChecklistList'

import { Switch, Route, Link } from "react-router-dom";

import { useEffect, useState } from 'react';
import firebase from './firebase'


function App() {
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
      // console.log(checklistListTemp)
    })
  }, [])
  return (
    <>
      <Switch>
        {checklistList ? checklistList.map((checklist, index) =>
          <Route path={`/${checklist.checklistName}`} key={index}>
            <Checklist checklistName={checklist.checklistName} />
          </Route>
        ) : ''
        }
        <Route path="/">
          <ChecklistList />
        </Route>

      </Switch>
    </>
  );
}

export default App;
