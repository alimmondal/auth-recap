import React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {

    // const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
    })


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
    //
    const handleSubmit = (e) => {
        // console.log(user.email, user.password);
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((res) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = '';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    // updateUserName(user.name);
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

    //update user info
    // const updateUserName = (name) => {
    //     const user = firebase.auth().currentUser;
    //     user.updateProfile({
    //         displayName: name

    //     }).then(() => {
    //         console.log('Update user name successfully')
    //     }).catch((error) => {
    //         console.log(error);
    //     });
    // }

    return (
        <div className="center">
            <h1>this is sign up</h1>

            <p>Name: {user.name}</p>
            <p>Email: {user.email} </p>
            <p>Password: {user.password}</p>

            <form onSubmit={handleSubmit}>
                <input onBlur={handleBlur} type="text" name="name" placeholder="Your Name" id="" />
                <br />
                <input type="email" onBlur={handleBlur} name="email" placeholder="your email address" id="" required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" placeholder="Password" id="" required />
                <br />
                <input type="submit" value="Sign Up" />


            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User created successfully</p>}
            <Link to="signIn">
                <p>Already have an account? Sign In</p>
            </Link>

        </div>
    );
};

export default SignUp;