import React, { useState, useContext } from "react";

import { v4 as uuidv4 } from "uuid";

import Timeline from "./components/timeline";

import dbContext from './ProjectRoot'

function Project() {
  const [currentTimeline, setCurrentTimeline] = useState();

  const db = useContext(dbContext);

  const createNewTimeline = () => {
    const t = {
        id: uuidv4(),
        name: "Hi"
    }
    db.collection('timelines').upsert(t)
    setCurrentTimeline(t.id)
  }

  return (
    <div>
        <button onClick={createNewTimeline}>Create timeline</button>
        {   
            currentTimeline && 
            <Timeline id={currentTimeline}></Timeline>
        }
    </div>

  );
}

export default Project;
