import Weather from "./Weather";

function App() {
  return (
    <div className="app">
      <header>
        <h1>Weather Report</h1>
        <p>Search the current weather for any city</p>
      </header>

      <main>
        <Weather />
      </main>

      <footer>
        <p>Data from OpenWeatherMap</p>
      </footer>
    </div>
  );
}

export default App;