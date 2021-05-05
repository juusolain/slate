import React from "react";

export default function TimelineEvent({
  event: { name, color, description, duration, startTime },
  timelineWidth,
  timelineStart,
}) {
  if (shoudBeVisible(startTime, duration, timelineStart, timelineWidth)) {
    return (
      <div
        className="absolute float-left h-full"
        style={{
          width: getWidth(duration, timelineWidth),
          left: getLeft(startTime, timelineWidth, timelineStart),
        }}
      >
        <div
          className="p-2 h-full border rounded border-transparent whitespace-nowrap overflow-hidden overflow-ellipsis"
          style={{
            backgroundColor: color,
          }}
        >
          <p className="text-white text-lg m-0">{name}</p>
          <p className="text-gray-400 m-0">{description}</p>
        </div>
      </div>
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
