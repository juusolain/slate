import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import withObservables from "@nozbe/with-observables";
import { compose } from "recompose";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { Q } from "@nozbe/watermelondb";

import Track from "./Track";
import { Box } from "@chakra-ui/react";

function Timeline({ timeline, tracks }) {
  console.log(timeline, tracks);
  const [timelineWidth, setTimelineWidth] = useState(500);
  const [timelineStart, setTimelineStart] = useState(0);

  //const timelineWidth = 500;
  //const mouseX = 0;
  //const timelineStart = 0;

  const [mouseX, setMouseX] = useState(0);

  // render events into list
  const trackComps = tracks.map((track, i) => {
    return (
      <Track
        key={track.id}
        track={track}
        timelineWidth={timelineWidth}
        timelineStart={timelineStart}
      />
    );
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

  return (
    <Box
      flex="1"
      overflow="hidden"
      onWheel={onWheelHandler}
      onMouseMove={onMoveHandler}
    >
      {trackComps}
      {timelineWidth},{timelineStart}
    </Box>
  );
}

const enhance = compose(
  withDatabase,
  withObservables(["timelineId"], ({ database, timelineId }) => ({
    timeline: database.get("timelines").findAndObserve(timelineId),
  })),
  withObservables(["timeline"], ({ timeline }) => ({
    tracks: timeline.tracks,
  }))
);

export default enhance(Timeline);
