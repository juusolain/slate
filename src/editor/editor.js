import { useEffect, useState } from "react";

import Sidebar from "./Sidebar";
import Timeline from "./timeline/Timeline";

import { Flex, Box, Container, Divider } from "@chakra-ui/layout";

import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import withObservables from "@nozbe/with-observables";
import { compose } from "recompose";

function Editor({ timelines }) {
  const [timelineId, setTimelineId] = useState(null);

  useEffect(() => {
    console.log(timelines);
  }, [timelines]);

  return (
    <Flex h="100vh">
      <Flex flex="1" bgColor="gray.100">
        <Sidebar timelineId={timelineId} onChangeTimeline={setTimelineId} />
      </Flex>
      <Divider orientation="vertical" borderColor="gray.400"></Divider>
      <Box flex="6" display="flex" flexDir="column">
        {timelineId && <Timeline timelineId={timelineId}></Timeline>}
      </Box>
    </Flex>
  );
}
export default Editor;
