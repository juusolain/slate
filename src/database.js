import RxDB from 'rxdb'

export const initializeDB = async () => {
    // create RxDB instance
    const db = await RxDB.create({
      name: 'slatedb',
      adapter: 'idb',
    });
  
    // add a collection to our db
    await db.collection({
      name: 'timelines',
      schema: {
        // ...
      },
    });

    await db.collection({
        name: 'events',
        schema: {
          // ...
        },
      });
  
    return db;
};