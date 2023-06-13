import { ContextStore } from "./Store";
import AppRouter from "./routes";

function App() {
  localStorage.setItem("email", "marquee@gmail.com");
  localStorage.setItem("password", "qwert@12345");

  return (
    <ContextStore>
      <AppRouter />
    </ContextStore>
  );
}

export default App;
