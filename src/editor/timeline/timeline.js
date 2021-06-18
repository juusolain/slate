import React, { useState } from "react";
import { useRxCollection, useRxData, useRxDocument } from "rxdb-hooks";
import { v4 as uuidv4 } from "uuid";

import Track from "./track";

export default function Timeline({ id, ...props }) {
  const [timelineWidth, setTimelineWidth] = useState(500);
  const [timelineStart, setTimelineStart] = useState(0);

  const [mouseX, setMouseX] = useState(0);

  const trackQueryConstructor = (collection) =>
    collection.find().where("timelineId").equals(id);

  const { result: timelineData } = useRxDocument("timelines", id);

  const trackCollection = useRxCollection("tracks");

  const { result: tracks, isFetching } = useRxData(
    "tracks",
    trackQueryConstructor
  );

  // render events into list
  const trackComps = tracks.map((track, i) => {
    return <Track track={track} />;
  });

  // zoom and scroll
  const onWheelHandler = (e) => {
    if (timelineWidth < 1000000 || e.deltaY < 0) {
      // max zoom to prevent overflow
      const zoomAmount = (e.deltaY * timelineWidth) / 100;
      let newStart = timelineStart - zoomAmount * mouseX;
      newStart += (e.deltaX * timelineWidth) / 1000;
      if (newStart < 0) {
        newStart = 0;
      }
      setTimelineStart(newStart);
      setTimelineWidth(timelineWidth + zoomAmount);
    }
  };

  // store mouse x for zoom
  const onMoveHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const xPercentage = x / rect.width;
    setMouseX(xPercentage);
  };

  const newTrack = (name) => {
    const n = {
      name: name,
      timelineId: id,
      id: uuidv4(),
    };

    trackCollection.upsert(n);
  };

  return (
    <div
      className="flex-1 overflow-hidden min-h-screen"
      onWheel={onWheelHandler}
      onMouseMove={onMoveHandler}
    >
      {trackComps}
    </div>
  );
}
