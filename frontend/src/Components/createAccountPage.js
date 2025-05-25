import React, { useState } from 'react';
import AmazonLogo from "../images/amazon_logo.png";
import { LoginComponent } from './loginPage';  

function CreateAccount() {
    const [accountCreated, setAccountCreated] = useState(false);

    const handleCreateAccount = async () => {
        const res = await fetch('http://localhost:8383/createAccountPage', {
            method:'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({
                username: document.getElementById("username").value,
                passwordInput: document.getElementById("password").value
            })
        });

        const data = await res.json();
        console.log(data);

        if (res.ok && data.message === "Account created") {
            setAccountCreated(true);
        } else {
            alert(data.message || "Account creation failed.");
        }
    }

    if (accountCreated == true) {
        console.log("Account Created");
        return (
            <LoginComponent />
        );
    }
    else {
        console.log("Account Not Created");
    }


    return (
        <div>
            <img src={AmazonLogo} alt="Amazon Logo" style={{ width: '200px', height: '80px' }} />   
            <h2>Create Your Amazon Account</h2>
            <p>Enter your email or mobile phone number</p>
            <input type="text" id="username" placeholder="Email or mobile phone number" />
            <br />
            <p>Password</p>
            <input type="password" id="password" placeholder="Password" />
            <br />
            <button onClick={handleCreateAccount}>Create your Amazon account</button>
        </div>
    );
}
export { CreateAccount };