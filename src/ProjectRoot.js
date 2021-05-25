import { initializeDB, dbContext } from "./database";
import React, { useState, useEffect } from "react";

import Project from "./Project";

import { Provider } from "rxdb-hooks";

function ProjectRoot() {
  const [db, setDb] = useState(null);
  const [dbError, setDbError] = useState(null);

  // load DB
  useEffect(() => {
    const initDB = async () => {
      if (db) return;
      try {
        const _db = await initializeDB();
        setDb(_db);
        console.log("DB initilized");
      } catch (err) {
        console.error("DB initialization failed", err);
        setDbError(err);
      }
    };
    console.log("starting DB init");
    initDB();
  }, [db]);

  if (db) {
    console.log("Db is valid");
    return (
      <Provider db={db.db}>
        <Project />
      </Provider>
    );
  } else if (dbError) {
    return <p>Error while loading DB</p>;
  } else {
    console.log("loading db");
    return <p>Loading DB</p>;
  }
}

export default ProjectRoot;

export { dbContext };
