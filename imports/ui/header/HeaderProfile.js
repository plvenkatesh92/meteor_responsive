import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export default function HeaderProfile(props) {
    const [activeMenu, setActiveMenu] = useState('password');
    const [menuHeight, setMenuHeight] = useState(null);
    const dropdownRef = useRef(null);
    const [language, setLanguage] = useState('en');

    return (
      <div className="profile-wrap" ref={dropdownRef}>   
       <div className="top">
         <div className="profileInner">
            <div className="profileImage">
                <img src="/images/gitlogo.png" alt="user" />
            </div>
            <div className="profileDetails">
                <h1> Venkat </h1>
                <p> Venkat@gmail.com </p>
            </div>
        </div>
        <div className="menuLink">
            <a className={activeMenu=='password'? "filledLink" : "normalLink"}
                onClick={(e) => { e.preventDefault(); setActiveMenu("password") } }>
                Change Password
            </a>
            <a className={ activeMenu=='language'? "filledLink" : "normalLink" }
                onClick={(e) => { e.preventDefault(); setActiveMenu("language") } }>
                Change Language
            </a>
        </div>
        <div className="form-div">
           
        </div>
    </div>
                    <div className="bottom">
                    <button type="submit" onClick={(e) => { e.preventDefault(); props.myCallback('logout'); } }
                     className="signout-btn">
                            Sign out
                     </button>
                </div>
      </div>
    )
}
