import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./screens/Start/StartScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartScreen />} />
        {/*      <Route path="/form" element={<FormScreen />} />
        <Route path="/stats" element={<StatsScreen />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
