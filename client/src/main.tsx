import React from "react";
import ReactDom from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import App from './App';

const rootElement = document.getElementById('root');
 const ChainId = 11155111;
if(rootElement)
{
    const root=ReactDom.createRoot(rootElement);


root.render(
    // Without clientId Thirdweb does not works
    <ThirdwebProvider clientId={import.meta.env.VITE_CLIENT_ID} activeChain={ChainId}>
        <Router>
            < App/>
        </Router>
    </ThirdwebProvider>
)
}