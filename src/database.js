import { Database } from "@nozbe/watermelondb";
import LokiJSAdapter from "@nozbe/watermelondb/adapters/lokijs";

import schema from "./model/schema";
import migrations from "./model/migrations";

import Event from "./model/event";
import Track from "./model/track";
import Timeline from "./model/timeline";

// create adapter
const adapter = new LokiJSAdapter({
  schema,
  // (You might want to comment out migrations for development purposes -- see Migrations documentation)
  //migrations,
  useWebWorker: false,
  useIncrementalIndexedDB: true,
  dbName: "slatedb", // optional db name

  // --- Optional, but recommended event handlers:

  onQuotaExceededError: (error) => {
    // Browser ran out of disk space -- offer the user to reload the app or log out
    console.error("DB quota exceeded", error);
  },
  onSetUpError: (error) => {
    console.error("Unable to load db, ", error);
    // Database failed to load -- offer the user to reload the app or log out
  },
  extraIncrementalIDBOptions: {
    onDidOverwrite: () => {
      console.warn("Overwrote IndexedDB");
      // Called when this adapter is forced to overwrite contents of IndexedDB.
      // This happens if there's another open tab of the same app that's making changes.
      // Try to synchronize the app now, and if user is offline, alert them that if they close this
      // tab, some data may be lost
    },
    onversionchange: () => {
      console.warn("Database deleted in another tab");
      // database was deleted in another browser tab (user logged out), so we must make sure we delete
      // it in this tab as well - usually best to just refresh the page
      /*if (checkIfUserIsLoggedIn()) {
        window.location.reload();
      }*/
    },
  },
});

// Then, make a Watermelon database from it!
export default new Database({
  adapter,
  modelClasses: [Event, Track, Timeline],
});
