import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import './app/assets/style/index.scss';

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_DATABASE_URL,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
  measurementId: process.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

const rootElement = document.getElementById('root')!;
const renderApp = () => {
  ReactDOM.createRoot(rootElement).render(<App />);
};

if (rootElement) {
  renderApp();
}
