import { useState, useRef ,useContext} from 'react';
import { UserContext } from '../../store/UserProvider';
import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';
require("dotenv").config();

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const[isLoading,setIsLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()
  const history = useHistory()
 
  const authCtx = useContext(UserContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const submitHandler = (e) =>{
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
     setIsLoading(true)
     let url;
    if(isLogin){
       url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_WEB_API}`
     

    }else{
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_WEB_API}}`
    }
      fetch(url
        ,{
          method:"POST",
          body:JSON.stringify({
            email:enteredEmail,
            password:enteredPassword,
            returnSecureToken:true
          }),
          headers:{
            "Content-Type":"application/json"
          }
        }
      ).then(res=>{
        setIsLoading(false)
        if(res.ok){
           return res.json()
        }else{
          return res.json().then(data=>{
           
               let errorMessage = "some error occured.."
               if(data && data.error && data.error.errors[0].message){
                errorMessage = data.error.errors[0].message
               }
              
               throw new Error(errorMessage)
            
          })
        }
      }).then(data=>{
       // console.log("token",data)
        authCtx.login(data.idToken)
         history.replace("/")
      })
      .catch(e=> alert(e.message))
    
      emailRef.current.value = ""
      passwordRef.current.value = ""
  }
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && <button>{isLogin ? "Login":"Create Account"}</button>}
          {isLoading && <p>loading...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
