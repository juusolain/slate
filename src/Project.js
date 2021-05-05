import initializeDB from './database';
import { Provider } from 'rxdb-hooks';
import React, {useState, useEffect} from 'react'

function Project() {
  const [db, setDb] = useState();

  const [currentTimeline, setCurrentTimeline] = useState();

  useEffect(() => {
    const initDB = async () => {
      const _db = await initializeDB();
      setDb(_db);
    };
    initDB();
  }, []);

  return (
    <Provider db={db}>
      <Timeline id={currentTimeline}></Timeline>
    </Provider>
  );
}

export default Project;
