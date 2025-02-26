import React, { useContext, useEffect, useState } from 'react'
import './LoginPopup.css'
import { storeContext } from '../../context/storeContext'
import { toast } from 'react-toastify'
import { userApi } from '../../services/api'

const LoginPopup = ({setLoginPopup}) => {

    const {token, setToken, setUserId, navigate}= useContext(storeContext);
    const[currState, setCurrState]=useState('LogIn')
    const[data, setData]=useState({
        username: '',
        email: '',
        password: '',
    });

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setData(data => ({ ...data, [name]: value}))
    }


    const onLogin = async (event) => {
        event.preventDefault();
        
        try {
            let response;
            if (currState === 'LogIn') {
                response = await userApi.login({
                    email: data.email,
                    password: data.password
                });
            } else {
                response = await userApi.signup({
                    username: data.username,
                    email: data.email,
                    password: data.password
                });
            }

            if (response.data.success) {
                const { token, data: userData } = response.data;
                setToken(token);
                setUserId(userData.id);
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userData.id);
                toast.success(`Welcome ${userData.username}!`);
                setLoginPopup(false);
                navigate('/dashboard');
            }
        } catch (error) {
            const message = error.response?.data?.message || 'An error occurred';
            toast.error(message);
        }
    };

    // useEffect(()=>{
    //     console.log(data);
    // }, [data]);

return (
    <div className='login-popup'>
            <form onSubmit={onLogin} className="login-popup-container">
                    <div className="login-popup-title">
                            <h2>{currState}</h2>
                            <button 
                                    onClick={() => setLoginPopup(false)}
                                    className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
                                    aria-label="Close"
                            >
                                    <svg 
                                            className="w-6 h-6" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24" 
                                            xmlns="http://www.w3.org/2000/svg"
                                    >
                                            <path 
                                                    strokeLinecap="round" 
                                                    strokeLinejoin="round" 
                                                    strokeWidth="2" 
                                                    d="M6 18L18 6M6 6l12 12"
                                            />
                                    </svg>
                            </button>
                    </div>
                    <div className="login-popup-inputs">
                            { currState === 'LogIn'
                            ? '' 
                            : <input onChange={onChangeHandler} value={data.username}
                            type="text" name='username' placeholder='Your Good Name' required /> 
                            }
                            <input onChange={onChangeHandler} value={data.email}
                            type="email" name='email' placeholder='Enter your email' required />
                            <input onChange={onChangeHandler} value={data.password}
                             type="password" name='password' placeholder='your password' required />
                    </div>
                    
                    <div className="login-popup-condition">
                            <input type="checkbox" required/>
                            <p>By continuing, I agree to the Terms of use and Privacy Policy</p>
                    </div>
                    <button type='submit'>{currState === 'SignUp'? 'Create a New Account' : 'LogIn'}</button>
                    {
                            currState === 'LogIn'
                            ? <p>Create a new account? <button onClick={()=>setCurrState('SignUp')}>SignUp</button></p>
                            : <p>Already Registered? <button onClick={()=>setCurrState('LogIn')}>LogIn</button></p>
                    }
                    
            </form>
    </div>
)}

export default LoginPopup