import React from 'react';
import { useState } from 'react';
import AmazonLogo from "../images/amazon_logo.png";


function Home() {
    return (
        <div style={{ justifyContent:'center', alignItems:'center', display:'flex', flexDirection:'column', }}>
            <img src={AmazonLogo} alt="Amazon Logo" style={{ width: '200px', height: '80px' }}/>
            <h2>Welcome to Amazon</h2>
            <p>Your one-stop shop for everything!</p>

            
        </div>
    );
}

export {Home} ;