import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./i18n/LanguageProvider";
import LanguageToggle from "./components/LanguageToggle";
import StartScreen from "./screens/Start/StartScreen";
import FormScreen from "./screens/Form/FormScreen";
import ParticipantsScreen from "./screens/Participants/ParticipantsScreen";
import MusicPlayer from "./components/MusicPlayer";
import ScheduleScreen from "./screens/Schedule/ScheduleScreen";

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <MusicPlayer />
        <LanguageToggle />
        <Routes>
          <Route path="/" element={<StartScreen />} />
          <Route path="/form" element={<FormScreen />} />
          <Route path="/participants" element={<ParticipantsScreen />} />
          <Route path="/schedule" element={<ScheduleScreen />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
