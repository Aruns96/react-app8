import React,{createContext,useState} from 'react';

const UserContext = createContext({
     token:"",
     isLoggedIn:false,
     login:(token)=>{},
     logout:()=>{}
});


const UserProvider = ({children}) => {
  const [token,setToken] = useState(null)
  const userIsLoggedIn = !!token;

  const loginHandler=(token)=>{
      setToken(token)
  }
  const logoutHandler = ()=>{
     setToken(null)
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
