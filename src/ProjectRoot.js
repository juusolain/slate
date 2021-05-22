import initializeDB from "./database";
import { Provider } from "rxdb-hooks";
import React, { useState, useEffect } from "react";

import Project from "./Project";

const dbContext = React.createContext();

function ProjectRoot() {
  const [db, setDb] = useState(null); // actually DB promise

  // load DB
  useEffect(() => {
    const initDB = async () => {
      const _db = initializeDB();
      setDb(_db);
    };
    initDB();
  }, []);

  if(db){
    return (
      <dbContext.Provider value={db}>
        <Project />
      </dbContext.Provider>
    );
  }else{
    return (
      <p>Awaiting DB</p>
    )
  }

}

export default ProjectRoot;
