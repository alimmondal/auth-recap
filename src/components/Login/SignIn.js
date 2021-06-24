import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';

const SignIn = () => {
    // const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    });

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();

    let { from } = location.state || { from: { pathname: "/" } };

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
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
                setLoggedInUser(signedInUser);
                history.replace(from);
                console.log(displayName, photoURL, email);
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }

    //Fb Sign In handler 
    const handleFbSignIn = () => {
        const fbProvider = new firebase.auth.FacebookAuthProvider();
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((result) => {
                // const newUserInfo = { ...user };
                //     newUserInfo.error = '';
                //     newUserInfo.success = true;
                //     setUser(newUserInfo);
                //     setLoggedInUser(newUserInfo);
                var credential = result.credential;
                var user = result.user;
                var accessToken = credential.accessToken;
                history.replace(from);
                console.log(result.user)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
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

        if (user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
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
        <div className="center" >
            <h1>Sign In</h1>
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