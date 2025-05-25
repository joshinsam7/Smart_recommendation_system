import './App.css';
import { LoginComponent } from './Components/loginPage.js';
import { CreateAccount } from './Components/createAccountPage.js';
import { useState } from 'react';

function App() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        {showCreateAccount ? (
          <CreateAccount setShowCreateAccount={setShowCreateAccount} />
        ) : (
          <LoginComponent setShowCreateAccount={setShowCreateAccount} />
        )}
      </div>
    </div>
  );
}

export default App;