import React from 'react';
import "./style.css" 
import TemporaryDrawer from './drawer';
import AnchorTemporaryDrawer from './drawer';
import Button from '../Button';
import { Link } from 'react-router-dom';
function Header() {
  return (
    <div className='navbar'>
      <h1 className='logo'>CryptoNexa<span style={{color:"var(--blue)"}}>.</span></h1>
      <div className='links'>
        <Link to='/'><p className='link'>Home</p></Link>
        <Link to='/compare'><p className='link'>Compare</p></Link>
        <Link to='/dashboard'>
          <Button text={"Dashboard"} onClick={()=>console.log("Btn Clicked")}/>
        </Link>
      </div>
      <div className='mobile-drawer'>
        <AnchorTemporaryDrawer/>
      </div>
    </div>
  )
}

export default Header