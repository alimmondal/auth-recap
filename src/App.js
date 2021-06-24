import './App.css';
import Home from './components/Home/Home';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import SignIn from './components/Login/SignIn';
import SignUp from './components/Login/SignUp';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import Header from './components/Header/Header';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// import PrivateRoute from './components/PrivateRoute/PrivateRoute';

firebase.initializeApp(firebaseConfig);

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
    <Router>
      <h3>Email: {loggedInUser.email}</h3>
      <Header></Header>
      <Switch>
        <Route path="/signIn">
          <SignIn></SignIn>
        </Route>
        <PrivateRoute path="/shipment">
          <Shipment></Shipment>
        </PrivateRoute>
        <Route path="/signUp">
          <SignUp></SignUp>
        </Route>
        <Route path="/">
          <Home></Home>
        </Route>
      </Switch>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
