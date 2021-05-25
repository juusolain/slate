import React from "react";
import Timeline from "./timeline";

export default {
  component: Timeline,
  title: "Timeline",
};

const Template = (args) => <Timeline {...args} />;

export const Default = Template.bind({});
Default.args = {
  events: [
      {
        name: "TestEvent",
        description: "This is a test description",
        color: "blue", // a css color
        duration: 100,
        startTime: 10
      },
      {
        name: "Test2Event",
        description: "This is a test description",
        color: "green", // a css color
        duration: 10,
        startTime: 30
      },
      {
        name: "Test3Event",
        description: "This is a test description",
        color: "red", // a css color
        duration: 40,
        startTime: 70
      }
  ]
};
