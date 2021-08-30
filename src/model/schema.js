import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "events",
      columns: [
        { name: "name", type: "string" },
        { name: "track_id", type: "string", isIndexed: true },
        { name: "color", type: "string", isOptional: true },
        { name: "description", type: "string", isOptional: true },
        { name: "duration", type: "number" },
        { name: "start_time", type: "number" },
      ],
    }),
    tableSchema({
      name: "tracks",
      columns: [
        { name: "name", type: "string" },
        { name: "timeline_id", type: "string" },
      ],
    }),
    tableSchema({
      name: "timelines",
      columns: [{ name: "name", type: "string" }],
    }),
  ],
});
