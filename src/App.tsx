// import { useState } from "react";
import "./App.css";
import { ContextStore } from "./Store";
import AppRouter from "./routes";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <ContextStore>
      <AppRouter />
    </ContextStore>
  );
}

export default App;
