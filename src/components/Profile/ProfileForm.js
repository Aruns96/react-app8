import classes from './ProfileForm.module.css';
import { useRef,useContext } from 'react';
import { UserContext } from '../../store/UserProvider';
//require("dotenv").config()

const ProfileForm = () => {
  const authCtx = useContext(UserContext)
  const token = authCtx.token;
  const newPasswordRef = useRef()
  const submitHandler = (e) =>{
    e.preventDefault();
    const inputNewPassword = newPasswordRef.current.value;
     
     fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${process.env.REACT_APP_WEB_API}`
      ,{
        method:"POST",
        body:JSON.stringify({
          idToken:token,
          password : inputNewPassword,
          returnSecureToken:false
        }),
        headers:{
          "Content-Type":"application/json"
        }
      }
     ).then(res =>{
          
     })
  

  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="6" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
