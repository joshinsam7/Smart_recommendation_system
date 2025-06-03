// App.js
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginComponent } from './Components/loginPage';
import { CreateAccount } from './Components/createAccountPage';
import { Home } from './Components/Home.js'; // Create this if you haven’t

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/create" element={<CreateAccount />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;