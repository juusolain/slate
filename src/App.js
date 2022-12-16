import Editor from "./editor/Editor.js";

import database from "./database";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";

function App() {
  return (
    <DatabaseProvider database={database}>
      <div className="App font-sans">
        <Editor className="h-screen" />
      </div>
    </DatabaseProvider>
  );
}

export default App;
