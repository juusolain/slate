import React, { useState } from "react";
import TimelineEvent from "./Event";

import { Box, Button, Text } from "@chakra-ui/react";

import withObservables from "@nozbe/with-observables";

function Track({ track, events, timelineStart, timelineWidth, ...props }) {
  const eventComps = events.map((ev, i) => {
    return (
      <TimelineEvent
        event={ev}
        key={ev.id}
        timelineWidth={timelineWidth}
        timelineStart={timelineStart}
      />
    );
  });

  const createNewEvent = () => {
    track.addEvent("test");
  };

  return (
    <Box backgroundColor="gray.100" flex="1" height="24">
      <Box display="relative" height="24" className="relative h-24">
        {events.length == 0 ? (
          <Box
            padding="2"
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text margin="2">It looks like there's not events...</Text>
            <Button colorScheme="teal" onClick={() => createNewEvent()}>
              Click here to create one{" "}
            </Button>
          </Box>
        ) : (
          eventComps
        )}
      </Box>
    </Box>
  );
}

const enhance = withObservables(["track"], ({ track }) => ({
  track,
  events: track.events,
}));

export default enhance(Track);
