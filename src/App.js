import React from "react";
import Container from "./components/Container";
import { WeatherProvider } from "./contexts/WeatherContext";

function App() {
  return (
    <WeatherProvider>
      <div className="App">
        <Container />
      </div>
    </WeatherProvider>
  );
}

export default App;
