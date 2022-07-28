import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from './firebase';
import "./Login.css";

function Login() {
    
    //Having "" or null is not recommended instead empty string NOTE TOSELF CHANGE LATER
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    
    const history = useHistory();

    const signIn = e => {
        e.preventDefault();
        //firebase login part here
        
        auth.signInWithEmailAndPassword(email,password).then(auth =>{
            history.push("./")
        }).catch(error => alert(error.message))

    };

    const signUp = e => {
        e.preventDefault();
        //firebase signUp part here

        auth.createUserWithEmailAndPassword(email,password).then(
        (auth)=> 
            {
                console.log(auth);
                if (auth) 
                {
                    history.push("./")
                }
            }
        ).catch(error => alert(error.message))
    };

  return (
    <div className='login'>
        <Link to="/">
            <img className='login__logo' src='https://pngimg.com/uploads/amazon/amazon_PNG13.png' />
        </Link>

        <div className='login__container'>
            <h1>Sign in</h1>
            
            <form>
                <h5>
                    Email
                </h5>
                <input type="text" value={email} 
                    onChange={
                        e => setEmail(e.target.value)
                    }
                />

                <h5>
                    Password
                </h5>
                <input type="password" value={password} 
                    onChange={
                        e => setPassword(e.target.value)
                    }
                />

                <button type='submit' onClick={signIn} className='login__signInButton'>
                    Sign in
                </button>

            </form>

                <p>
                    All content included in or made available through any Amazon Service, such as text, graphics, logos, button icons, images, audio clips, digital downloads, data compilations, and software is the property of Amazon or its content suppliers and protected by United States and international copyright laws. The compilation of all content included in or made available through any Amazon Service is the exclusive property of Amazon and protected by U.S. and international copyright laws.
                </p>

                <button onClick={signUp} className='login__signUpButton'>
                    Create <strong>FAKE</strong> Amazon Account
                    </button>

            
        </div>
    </div>
  )
}

export default Login