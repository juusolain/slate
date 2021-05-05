import React, { useState } from "react";
import { useRxData } from 'rxdb-hooks';

import Track from './timeline/track'

export default function Timeline({ id, ...props }) {
  const [timelineWidth, setTimelineWidth] = useState(500);
  const [timelineStart, setTimelineStart] = useState(0);

  const [mouseX, setMouseX] = useState(0);

  const queryConstructor = collection =>
    collection
      .find()
      .where('id')
      .equals(id);

    const { result: tracks, isFetching } = useRxData(
        'tracks',
        queryConstructor
    );


  // render events into list
  const trackComps = tracks.map((ev, i) => {
    return (
      <Track />
    );
  });

  // zoom and scroll
  const onWheelHandler = (e) => {
    if (timelineWidth < 1000000 || e.deltaY < 0) {
      // max zoom to prevent overflow
      const zoomAmount = (e.deltaY * timelineWidth) / 100;
      let newStart = timelineStart - zoomAmount * mouseX;
      newStart += (e.deltaX * timelineWidth) / 1000;
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

  return (
    <div
      className="bg-gray-100 flex-1 overflow-hidden"
      onWheel={onWheelHandler}
      onMouseMove={onMoveHandler}
    >
      {trackComps}
    </div>
  );
}
