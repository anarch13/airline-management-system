import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import Dashboard from './Components/Dashboard/Dashboard';
import FlightResults from './Components/FlightResults/FlightResults';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/results" element={<FlightResults />} />
      </Routes>
    </Router>
  );
}

export default App;
