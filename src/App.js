import logo from './logo.svg';
import './App.css';

// FIREBASE
import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// FIREBASE HOOKS
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_SUPERCHAT_API_KEY,
  authDomain: process.env.REACT_APP_SUPERCHAT_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_SUPERCHAT_PROJECT_ID,
  storageBucket: process.env.REACT_APP_SUPERCHAT_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SUPERCHAT_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_SUPERCHAT_APP_ID,
  measurementId: process.env.REACT_APP_SUPERCHAT_MEASUREMENT_ID
});

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

// ===================================================================================

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  return (
    <div></div>
  );
}

function ChatRoom() {
  return (
    <div></div>
  );
}

export default App;
