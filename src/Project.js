import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useRxCollection } from "rxdb-hooks";

import Timeline from "./components/timeline/timeline/timeline";

function Project() {
  const [currentTimeline, setCurrentTimeline] = useState();

  const timelines = useRxCollection("timelines");

  console.log(timelines);

  const createNewTimeline = () => {
    const t = {
      id: uuidv4(),
      name: "Hi",
    };
    timelines.upsert(t);
    setCurrentTimeline(t.id);
  };

  return (
    <div className="w-screen">
      <div className="bg-green-200 sticky flex p-1 items-start items-center m-2 rounded">
        <button className="bg-green-500 rounded p-1 px-2 mx-1">Timeline</button>
        {timelineModalOpen && <TimelineModal></TimelineModal>}
        <button className="bg-green-500 rounded p-1 px-2 mx-1">Track</button>
        {trackModalOpen && <TrackModal></TrackModal>}
      </div>
      <div>{currentTimeline && <Timeline id={currentTimeline}></Timeline>}</div>
    </div>
  );
}

export default Project;
