import RxDB from "rxdb";

import eventSchema from "./schema/event.json";
import trackSchema from "./schema/track.json";
import timelineSchema from "./schema/timeline.json";

export const initializeDB = async () => {
  // create RxDB instance
  const db = await RxDB.create({
    name: "slatedb",
    adapter: "idb",
  });

  // add a collection to our db
  await db.collection({
    name: "timelines",
    schema: timelineSchema,
  });

  await db.collection({
    name: "tracks",
    schema: trackSchema,
  });

  await db.collection({
    name: "events",
    schema: eventSchema,
  });

  return db;
};
