import React,{createContext,useState} from 'react';

const UserContext = createContext({
     token:"",
     isLoggedIn:false,
     login:(token)=>{},
     logout:()=>{}
});


const UserProvider = ({children}) => {
  const initialToken = localStorage.getItem("token");

  const [token,setToken] = useState(initialToken)
  const userIsLoggedIn = !!token;

  const loginHandler=(token)=>{
   
      setToken(token)
      localStorage.setItem("token",token)
  }
  const logoutHandler = ()=>{
   
     setToken(null)
     localStorage.removeItem("token")
  }
  const contextValue ={
    token:token,
    isLoggedIn:userIsLoggedIn,
    login:loginHandler,
    logout:logoutHandler
  }

  return (
    <UserContext.Provider value={contextValue}>
         {children}
    </UserContext.Provider>
  )
}

export {UserProvider,UserContext}
