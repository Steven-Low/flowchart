import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactFlowProvider } from '@xyflow/react';
import { 
  BrowserRouter,
  Routes,
  Route,
 } from 'react-router-dom';
 
import App from './App';
import Home from './Home';

import './index.css';

 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReactFlowProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/flowchart/:flowId" element={<App/>} />
        <Route path="/" element={<Home />} />
      </Routes>
      </BrowserRouter>
    </ReactFlowProvider>
  </React.StrictMode>,
);