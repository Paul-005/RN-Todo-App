import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBsUWtnnpfv3wlZa76X5wfPhr25sJfRlFE',
  authDomain: 'carcart-paul.firebaseapp.com',
  projectId: 'carcart-paul',
  storageBucket: 'carcart-paul.appspot.com',
  messagingSenderId: '98215944364',
  appId: '1:98215944364:web:f0165358f84d00a6edbf09',
  measurementId: 'G-QYL88F0B8N',
};

// Initialize Firebase
try {
  if (firebaseConfig.apiKey) {
    firebase.initializeApp(firebaseConfig);
  }
} catch (err) {
  console.log(err);
}
