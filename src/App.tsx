import { ContextStore } from "./Store";
import AppRouter from "./routes";

function App() {
  return (
    <ContextStore>
      <AppRouter />
    </ContextStore>
  );
}

export default App;
