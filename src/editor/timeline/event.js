import React from "react";
import withObservables from "@nozbe/with-observables";
import { Box } from "@chakra-ui/react";

function TimelineEvent({
  event: { name, color, description, duration, startTime },
  timelineWidth,
  timelineStart,
}) {
  if (shoudBeVisible(startTime, duration, timelineStart, timelineWidth)) {
    return (
      <Box
        height="100%"
        float="left"
        position="relative"
        resize="horizontal"
        style={{
          width: getWidth(duration, timelineWidth),
          left: getLeft(startTime, timelineWidth, timelineStart),
        }}
      >
        <Box
          padding="2"
          backgroundColor="teal.200"
          height="100%"
          borderRadius="1"
          resize="horizontal"
          onres
          borderWidth="1"
          overflow="hidden"
          textOverflow="ellipsis"
          className="p-2 h-full border rounded border-transparent whitespace-nowrap overflow-hidden overflow-ellipsis"
          style={{
            backgroundColor: color,
          }}
        >
          <p className="text-white text-lg m-0">{name}</p>
          <p className="text-gray-200 m-0">{description}</p>
        </Box>
      </Box>
    );
  }
  return null;
}

function getWidth(duration, timelineWidth) {
  return (duration / timelineWidth) * 100 + "%";
}

function getLeft(startTime, timelineWidth, timelineStart) {
  return ((startTime - timelineStart) / timelineWidth) * 100 + "%";
}

function shoudBeVisible(startTime, duration, timelineStart, timelineWidth) {
  const end = startTime + duration;
  const timelineEnd = timelineStart + timelineWidth;
  return (
    (startTime >= timelineStart && startTime <= timelineEnd) ||
    (end <= timelineEnd && end >= timelineStart) ||
    (end >= timelineEnd && startTime <= timelineStart)
  );
}

const enhance = withObservables(["event"], ({ event }) => ({
  event,
}));
const EnchancedTimelineEvent = enhance(TimelineEvent);
export default EnchancedTimelineEvent;
