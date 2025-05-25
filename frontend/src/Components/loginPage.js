import React, { useState } from "react";
import AmazonLogo from "../images/amazon_logo.png";
import { useNavigate } from "react-router-dom";
import { CreateAccount } from "../Components/createAccountPage.js";
import {Home } from "../Components/Home.js";

function LoginComponent() {
    const [showCreateAccount, setCreateAccount] = useState(false);
    const [showHome, setHomePage] = useState(false);

    const handleLogin = async () => {
        console.log("⚙️ Sending login request...");
        const res = await fetch('http://localhost:8383/loginPage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: document.getElementById("username").value,
                password: document.getElementById("password").value
            })
        });

        const data = await res.json();
        console.log("✅ Server response:", data);

        if (res.ok && data.message === "Account Authenticated") {
            console.log("🎉 Login successful");
            setHomePage(true);
        } else {
            console.log("❌ Login failed:", data.message);
            alert(data.message);
        }
    };


    if (showCreateAccount) {
        console.log("Create Account");
        return <CreateAccount />;
    }

    if (showHome){
        return <Home />;
    }

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
            <img src={AmazonLogo} alt="Amazon Logo" style={{ width: '200px', height: '80px' }} />
            <div style={{ width: '400px', textAlign: 'left', border: '2px solid rgba(0,0,0,0.2)', padding: '35px', margin: '5px', borderRadius: '10px', backgroundColor: 'white' }}>
                <h2>Sign in or Create an Account</h2>
                <p>Enter mobile number or email</p>
                <input id="username" type="text" style={{ width: '95%', padding: '12px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px' }} />
                <p>Password</p>
                <input id="password" type="password" style={{ width: '95%', padding: '12px', border: '1px solid rgba(0,0,0,0.2)', borderRadius: '5px' }} />
                <button style={{ width: '102%', backgroundColor: '#FF9800', color: 'Black', padding: '14px 20px', border: 'none', borderRadius: '25px', marginTop: '10px' }} onClick={handleLogin}>Sign In</button>
                <a href="#help" style={{ textDecoration: 'none', color: 'blue' }}>Need help?</a>
                <hr style={{ border: '1px solid rgba(0,0,0,0.2)' }} />
                <a href="#" style={{ textDecoration: 'none', color: 'blue' }} onClick={() => setCreateAccount(true)}>
                    Create your Amazon account
                </a>
            </div>
        </div>
    );
}

export { LoginComponent };
