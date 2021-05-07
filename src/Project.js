import initializeDB from "./database";
import { Provider } from "rxdb-hooks";
import React, { useState, useEffect } from "react";

import Timeline from "components/timeline";

function Project() {
  const [db, setDb] = useState();

  const [currentTimeline, setCurrentTimeline] = useState();

  // load DB
  useEffect(() => {
    const initDB = async () => {
      const _db = await initializeDB();
      setDb(_db);
    };
    initDB();
  }, []);

  return (
    <Provider db={db} idAttribute="id">
      <Timeline id={currentTimeline}></Timeline>
    </Provider>
  );
}

export default Project;
