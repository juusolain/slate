import React, { useState } from "react";
import TimelineEvent from "./timeline/event";
import { useRxData } from "rxdb-hooks";

export default function Track({
  track,
  timelineStart,
  timelineWidth,
  ...props
}) {
  const queryConstructor = (collection) =>
    collection.find().where("trackId").equals(track.id);

  const { result: events, isFetching } = useRxData("events", queryConstructor);

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

  if (isFetching) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="bg-gray-100 flex-1 h-24 overflow-hidden">
      <div className="relative h-24">{eventComps}</div>
    </div>
  );
}
