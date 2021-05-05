import React, { useState } from "react";
import TimelineEvent from "./timeline/event";

export default function Track({ events, timelineStart, timelineWidth, ...props }) {
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

  return (
    <div
      className="bg-gray-100 flex-1 h-24 overflow-hidden"
    >
      <div className="relative h-24">{eventComps}</div>
    </div>
  );
}
