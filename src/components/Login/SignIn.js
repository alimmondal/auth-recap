import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })
    var provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleGoogleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser);
                console.log(displayName, photoURL, email);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }


    //Fb Sign In handler 
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                var credential = result.credential;
                // The signed-in user info.
                var user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
                console.log(user)
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }


    const handleGoogleSignOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signedOutUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                    error: '',
                    success: '',
                }
                setUser(signedOutUser);
                console.log(res);
            }).catch((error) => {
                console.log(error);
            });
    }


    //created user with email and password
    const handleBlur = (event) => {
        let isFieldValid = true;
        console.log(event.target.name, event.target.value)
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if (event.target.name === 'password') {
            const isPasswordValid = event.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[event.target.name] = event.target.value;
            setUser(newUserInfo);
        }
    }

    
    const handleSubmit = (e) => {
        console.log(user.email, user.password);
        
        if ( user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log(res.user)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }


    return (
        <div className="center">
            <h1>this is sign In</h1>
            {
                user.isSignedIn ? <button onClick={handleGoogleSignOut}>Sign Out</button> :
                    <button onClick={handleGoogleSignIn}>Sign In With Google</button>
            }
            <br />
            <button onClick={handleFbSignIn}>Sign In Using Facebook</button>

            {
                user.isSignedIn && <div>
                    <p>Welcome {user.name}</p>
                    <p>Your email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }

            <h1>Our own authentication</h1>
            
            <p>Name: {user.name}</p>
            <p>Email: {user.email} </p>
            <p>Password: {user.password}</p>
           

            <form onSubmit={handleSubmit}>

                <input type="email" onBlur={handleBlur} name="email" placeholder="your email address" id="" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" id="" required />
                <br />
                <input type="submit" value="Sign In" />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {
            user.success && <p style={{ color: 'green' }}>User logged in successfully</p>
            }

            <Link to="signUp">
                <p>Don't have an account? Sign Up</p>
            </Link>



        </div>
    );
};

export default SignIn;