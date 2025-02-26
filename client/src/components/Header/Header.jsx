import React, { useContext, useEffect } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { storeContext } from '../../context/storeContext'
import { toast } from 'react-toastify'

const Header = () => {
  const {userId, token, navigate}=useContext(storeContext);


  const handleAuth=()=>{
    if(token){
      navigate('/create-challenge');
    }else{
      navigate('/');
      toast.warn('Please login to continue'); 
    }
  }

  return (
    <div className='header'>
        <div className="header-content">
            <p>🎭Where Pop Culture Meets Brainpower!</p>
            <h3>🕹️ Learn, Play, Earn—Turn Your <span>Fandom Into Wisdom!</span></h3>
            <p>Create your own challenge, mint tokens, send rewards and explore the marketplace while listing your nfts-- all at one place.</p>
            <button className='btn' onClick={handleAuth}>Hop in!</button>
        </div>
        <div className="header-img">
            <img src='/b2.jpg' alt="heroImage" />
        </div>
        </div>
  )
}

export default Header