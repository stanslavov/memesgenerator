import './App.css';

import { MemesProvider } from "./hooks/use-http";
import MemesComponent from "./components/MemesComponent";

function App() {
  return (
    <MemesProvider>
      <MemesComponent />
    </MemesProvider>
  );
}

export default App;
