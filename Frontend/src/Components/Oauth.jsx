import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../../redux/user';
import { useNavigate } from 'react-router-dom';
const Oauth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogleClick = async (e)=>{
        try {
            function generateUsername(fullName) {
                const name = fullName.toLowerCase().replace(/\s+/g, '');
                const randomNum = Math.floor(Math.random() * 10000); 
                return `${name}${randomNum}`;
            }
            const provider =  new GoogleAuthProvider();
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider);
            console.log(result);
            const res = await fetch("/api/v1/auth/google",{
                method : "POST",
                headers: {
                    'Content-type':'application/json',
                },
                body : JSON.stringify({
                    username: generateUsername(result.user.displayName),
                    fullName: result.user.displayName,
                    email:result.user.email,
                    photourl:result.user.photoURL,
                })
            });
            const result1 = await res.json();
            console.log(result1);
            dispatch(signInSuccess(result1.data));
            navigate("/");
        } catch (error) {
            console.log("could not sign in with google",error);
        }
  }
  return (
    <button onClick={handleGoogleClick} type="button" className='mx-w-6xl p-3 text-center bg-red-500 rounded-lg text-slate-100 hover:opacity-90'>CONTINUE WITH GOOGLE</button>
  )
}

export default Oauth;