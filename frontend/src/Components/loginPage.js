import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8383/loginPage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    const data = await res.json();
    console.log("Server response:", data);
    
    if (res.ok && data.message === "Account Authenticated") {
      console.log("Login successful");
      navigate('/home'); 
    } else {
      console.log("Login failed:", data.message);
      alert(data.message);
    }
  };

  return (
    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
      <div style={{ width: '400px', textAlign: 'left', border: '2px solid rgba(0,0,0,0.2)', padding: '35px', margin: '5px', borderRadius: '10px', backgroundColor: 'white' }}>
        <h2>Sign in or Create an Account</h2>
        <p>Enter mobile number or email</p>
        <input id="username" type="text" onChange={e => setUsername(e.target.value)} style={{ width: '95%', padding: '12px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px' }} />
        <p>Password</p>
        <input id="password" type="password" onChange={e => setPassword(e.target.value)} style={{ width: '95%', padding: '12px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px' }} />
        <button
          style={{ width: '102%', backgroundColor: '#FF9800', color: 'Black', padding: '14px 20px', border: 'none', borderRadius: '25px', marginTop: '10px' }}
          onClick={handleLogin}
        >
          Sign In
        </button>
        <span
          onClick={() => navigate('/create')}
          style={{ display: 'block', marginTop: '10px', textDecoration: 'underline', cursor: 'pointer', color: 'blue' }}
        >
          Create your Amazon account
        </span>
      </div>
    </div>
  );
}

export { LoginComponent };
