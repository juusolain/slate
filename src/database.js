import React from "react";

import { createRxDatabase, addRxPlugin } from "rxdb";
import idbAdapter from "pouchdb-adapter-idb";
import memoryAdapter from "pouchdb-adapter-memory";

import eventSchema from "./schema/event.json";
import trackSchema from "./schema/track.json";
import timelineSchema from "./schema/timeline.json";

addRxPlugin(idbAdapter);
addRxPlugin(memoryAdapter);

// inits DB and returns collections
export const initializeDB = async () => {
  // create RxDB instance
  const db = await createRxDatabase({
    name: "slatedb",
    adapter: "idb",
  });

  const collections = await db.addCollections({
    timelines: {
      schema: timelineSchema,
    },
    tracks: {
      schema: trackSchema,
    },
    events: {
      schema: eventSchema,
    },
  });
  return { collections, db };
};

const dbContext = React.createContext();

export { dbContext };
