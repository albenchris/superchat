import React, { useState, useRef } from 'react';
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

// ===================================================================================

function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return (
    <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  );
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    setFormValue('');
    // this will scroll new message into view with the useRef React hook
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

        <div ref={dummy}></div>
      </div>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e)=> setFormValue(e.target.value)}
          placeholder="say something nice"
        />
        <button type="submit" disabled={!formValue}>🕊️</button>
      </form>
    </>
  );
}

function ChatMessage({ message }) {
  const { text, uid, photoURL } = message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} />
      <p>{text}</p>
    </div>
  );
}

export default App;
