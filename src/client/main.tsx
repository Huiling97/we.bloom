import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import './app/assets/style/index.scss';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
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
