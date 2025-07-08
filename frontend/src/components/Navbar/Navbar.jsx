// import React, { useState, useContext } from 'react';
// import './Navbar.css';
// import { assets } from '../../assets/assets';
// import { Link } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const Navbar = ({ setShowLogin }) => {
//   const [menu, setMenu] = useState("menu");

//   const { getTotalCartAmount, token, setToken } = useContext(StoreContext);

//   const logout = () => {
    
//   }

//   return (
//     <div className='navbar'>
//       <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

//       <ul className="navbar-menu">
//         <li className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
//           <Link to="/">home</Link>
//         </li>
//         <li className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>
//           <a href="#explore-menu">menu</a>
//         </li>
//         <li className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>
//           <a href="#app-download">mobile-app</a>
//         </li>
//         <li className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>
//           <a href="#footer">contact-us</a>
//         </li>
//       </ul>

//       <div className="navbar-right">
//         <img src={assets.search_icon} alt="Search" />
//         <div className="navbar-search-icon">
//           <Link to='/cart'><img src={assets.basket_icon} alt="Basket" /></Link>
//           <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
//         </div>

//         {
//           !token ? (
//             <button onClick={() => setShowLogin(true)}>sign in</button>
//           ) : (
//             <div className='navbar-profile'>
//               <img src={assets.profile_icon} alt="Profile" />
//               <ul className="nav-profile-dropdown">
//                 <li onClick={()=>{'/myorders'}}><img src={assets.bag_icon} alt="Orders" /><p>Orders</p></li>
//                 <hr />
//                 <li onClick={() => {
//                   setToken("");
//                   localStorage.removeItem("token");
//                 }}>
//                   <img src={assets.logout_icon} alt="Logout" /><p>Logout</p>
//                 </li>
//               </ul>
//             </div>
//           )
//         }
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useContext } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="Logo" className="logo" /></Link>

      <ul className="navbar-menu">
        <li className={menu === "home" ? "active" : ""} onClick={() => setMenu("home")}>
          <Link to="/">home</Link>
        </li>
        <li className={menu === "menu" ? "active" : ""} onClick={() => setMenu("menu")}>
          <a href="#explore-menu">menu</a>
        </li>
        <li className={menu === "mobile-app" ? "active" : ""} onClick={() => setMenu("mobile-app")}>
          <a href="#app-download">mobile-app</a>
        </li>
        <li className={menu === "contact-us" ? "active" : ""} onClick={() => setMenu("contact-us")}>
          <a href="#footer">contact-us</a>
        </li>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="Search" />
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="Profile" />
            <ul className="nav-profile-dropdown">
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt="Orders" />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="Logout" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
