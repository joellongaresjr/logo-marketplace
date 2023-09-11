import "./HeaderStyles.css";
import Auth from "../../utils/auth";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS_FUZZY } from "../../utils/queries";
import logo from "../../assets/images/logo.svg";
import Login from "./../../pages/Login/Login";
import Signup from "./../../pages/Signup/Signup";

const Header = () => {
  const [burgerClick, setBurgerClick] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [fuzzyMatch, setFuzzyMatch] = useState([]);
  const { pathname } = useLocation();


  const burgerToggle = () => {
    setBurgerClick(!burgerClick);
  };

  useEffect(() => {
    setBurgerClick(false);
  }, [pathname]);

  useEffect(() => {
    console.log(fuzzyMatch);
  }, [fuzzyMatch]);


  // Use the useQuery hook directly within the component
  const { data } = useQuery(QUERY_PRODUCTS_FUZZY, {
    variables: { query: searchQuery },
  });

  useEffect(() => {
    // Update fuzzyMatch when data changes
    if (data) {
      setFuzzyMatch(data.getProductsFuzzy);
    }
  }, [data]);

  const searchChangeHandler = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <header>
      <div className={burgerClick ? "nav-title active" : "nav-title"}>
        <Link to="/">
          <img
            src={logo}
            style={{ width: "4rem", height: "auto" }}
            className="logo"
          />
        </Link>
        <h1>Logo MarketPlace</h1>
      </div>
      <ul className={burgerClick ? "nav-menu active" : "nav-menu"}>
        <li>
          <form className="nav-search">
            <input type="text" placeholder="Search.." name="search" onChange={searchChangeHandler} list="fuzzyMatchList" />
            <datalist id="fuzzyMatchList">
              {fuzzyMatch.map((item) => (
                <option key={item._id} value={item.name} />
              ))}
            </datalist>
            <button type="submit">Submit</button>
          </form>
        </li>
      
        { Auth.loggedIn() ? (
            <li>
            <Link
              to="/"
              className={pathname === "/" ? "current-page" : "nav-item"}
              onClick={() => Auth.logout()}
            >
              Logout
            </Link>
          </li>
          ) : (
            <>
            <li>
          <Link
            to="/login"
            className={pathname === "/login" ? "current-page" : "nav-item"}
          >
            Login
          </Link>
        </li>
        <li>
          <Link
            to="/signup"
            className={pathname === "/signup" ? "current-page" : "nav-item"}
          >
            Sign Up
          </Link>
        </li>
        </>
          )}
        <li>
          <Link
            to="/resume"
            className={pathname === "/resume" ? "current-page" : "nav-item"}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className={pathname === "/contact" ? "current-page" : "nav-item"}
          >
            Cart
          </Link>
        </li>
      </ul>
      <div className="burger" onClick={burgerToggle}>
        {burgerClick ? (
          <FaTimes size={25} style={{ color: "#3a2e39" }} />
        ) : (
          <FaBars size={25} style={{ color: "#fff" }} />
        )}
      </div>
    </header>
    
  );
 
};

export default Header;