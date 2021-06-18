import React from "react";
import TimelineEvent from "./event";

export default {
  component: TimelineEvent,
  title: "TimelineEvent",
};

const Template = (args) => <TimelineEvent {...args} />;

export const Default = Template.bind({});
Default.args = {
  event: {
    name: "TestEvent",
    description: "This is a test description",
    color: "blue", // a css color
    duration: 100,
    startTime: 10
  },
};
