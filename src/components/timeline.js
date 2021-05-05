import React, { useState } from "react";
import TimelineEvent from "./timeline/event";

export default function Timeline({ events, ...props }) {
  const [timelineWidth, setTimelineWidth] = useState(500);
  const [timelineStart, setTimelineStart] = useState(0);

  const [mouseX, setMouseX] = useState(0);

  const eventComps = events.map((ev, i) => {
    return (
      <TimelineEvent
        event={ev}
        key={i}
        timelineWidth={timelineWidth}
        timelineStart={timelineStart}
      />
    );
  });

  const onWheelHandler = (e) => {
    const zoomAmount = (e.deltaY * timelineWidth) / 100;
    let newStart = timelineStart - zoomAmount * mouseX;
    newStart += e.deltaX * 0.25;
    setTimelineStart(newStart);
    setTimelineWidth(timelineWidth + zoomAmount);
  };

  const onMoveHandler = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const xPercentage = x / rect.width;
    setMouseX(xPercentage);
  };

  return (
    <div
      className="bg-gray-100 flex-1 h-24 overflow-hidden"
      onWheel={onWheelHandler}
      onMouseMove={onMoveHandler}
    >
      <div className="relative h-24">{eventComps}</div>
    </div>
  );
}
