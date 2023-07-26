import './App.css';

import WeatherInformation from './WeatherInformation';

function App() {
  return (
    <div className="App">
      <WeatherInformation 
        tokenId={process.env.REACT_APP_TOKEN || ""}
      />
    </div>
  );
}

export default App;
