import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { AuthContextProvider } from './components/store/auth-context';
import { KeywordProvider } from './utils/KeywordContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <Reset />
    <BrowserRouter>
      <KeywordProvider>
        <App />
      </KeywordProvider>
    </BrowserRouter>
  </AuthContextProvider>,
);
