import { BrowserRouter, Routes, Route } from "react-router-dom";
import StartScreen from "./screens/Start/StartScreen";
import FormScreen from "./screens/Form/FormScreen";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <BrowserRouter>
      <MusicPlayer />
      <Routes>
        <Route path="/" element={<StartScreen />} />
        <Route path="/form" element={<FormScreen />} />
        {/*  
        <Route path="/stats" element={<StatsScreen />} />
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
