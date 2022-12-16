import {
  Text,
  Button,
  VStack,
  HStack,
  Box,
  Flex,
  Input,
  Divider,
  Grid,
  GridItem,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState } from "react";

import { of as of$ } from "rxjs";
import { withDatabase } from "@nozbe/watermelondb/DatabaseProvider";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import withObservables from "@nozbe/with-observables";
import { compose } from "recompose";

function Sidebar({
  database,
  timelines,
  timeline,
  timelineId,
  onChangeTimeline,
}) {
  const [ntlName, setNtlName] = useState("");
  const handleNtlNameChange = (event) => setNtlName(event.target.value);

  const TimelineMenu = () => {
    if (timelines) {
      return timelines.map((tl) => (
        <GridItem key={tl.id}>
          <Box w="100%" flex="1" display="flex" p="0">
            <Button
              isActive={timelineId === tl.id}
              onClick={() => onChangeTimeline(tl.id)}
              flex="1"
            >
              {tl.name}
            </Button>{" "}
            <IconButton flex="0" icon={<DeleteIcon />}></IconButton>
          </Box>
        </GridItem>
      ));
    } else {
      return (
        <Text align="center" flex="1">
          No timelines
        </Text>
      );
    }
  };

  const newTimeline = async () => {
    await database.write(async () => {
      await database.get("timelines").create((tl) => {
        tl.name = ntlName;
      });
    });
  };

  const newTrack = () => {
    timeline.addTrack("test");
  };

  return (
    <Box p="1em" flex="1">
      <VStack flex="1">
        <Flex flex="1" flexDir="column" w="100%" mt="2">
          <Text fontSize="lg" align="center">
            Timeline
          </Text>
          <Grid w="100%" mt="1" flexDir="column" p="1" z gap="2">
            <TimelineMenu />
          </Grid>
          <HStack>
            <Input
              value={ntlName}
              onChange={handleNtlNameChange}
              placeholder="Name"
            ></Input>
            <Button bgColor="teal.100" onClick={newTimeline}>
              New
            </Button>
          </HStack>
        </Flex>
        <Divider borderColor="gray.300" />
        <Flex flex="1" flexDir="column" w="100%" mt="2">
          <Text fontSize="lg" align="center">
            Track settings{" "}
          </Text>
          <Flex w="100%" mt="1">
            <Button bgColor="teal.50" flex="1" onClick={newTrack}>
              New Track
            </Button>
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
}

const enhance = compose(
  withDatabase,
  withObservables([], ({ database }) => ({
    timelines: database.get("timelines").query(),
  })),
  withObservables(["timelineId"], ({ database, timelineId }) => ({
    timeline: timelineId
      ? database.get("timelines").findAndObserve(timelineId)
      : of$(null),
  }))
);

export default enhance(Sidebar);
