import './App.css';
import Home from './components/Home/Home';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import SignIn from './components/Login/SignIn';
import Header from './Header/Header';
import SignUp from './components/Login/SignUp';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <Router>
      <Header></Header>
      <Switch>
        <Route path="/signIn">
          <SignIn></SignIn>
        </Route>
        <Route path="/signUp">
          <SignUp></SignUp>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
