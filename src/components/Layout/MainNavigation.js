import { Link } from 'react-router-dom';
import {  useContext } from "react";
import { UserContext } from '../../store/UserProvider';
import classes from './MainNavigation.module.css';
import { useHistory } from 'react-router-dom';

const MainNavigation = () => {
  const authCtx = useContext(UserContext);
  const history = useHistory()
  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = ()=>{
    authCtx.logout()
    history.replace("/auth")
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn && <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn && <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>}
          
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
